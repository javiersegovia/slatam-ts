import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common'
import { User, PrismaClientKnownRequestError } from '@prisma/client'
import { JwtService } from '@nestjs/jwt'
import { SecurityConfig } from '@config/config.interface'

import { ConfigService } from '@nestjs/config'
import { PrismaService } from '../prisma/prisma.service'
import { PasswordService } from './password.service'

import { SignupInput } from './dto/signup.input'
import { MailService } from '@mails/mail.service'
import { randomBytes } from 'crypto'
import { promisify } from 'util'
import ms from 'ms'

// TODO: move the "token" related methods to a new service inside this folder, named token.service

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService
  ) {}

  async createUser(payload: SignupInput) {
    const hashedPassword = await this.passwordService.hashPassword(
      payload.password
    )

    try {
      const verifyEmailToken = await this.generateRandomToken()

      const user = await this.prisma.user.create({
        data: {
          ...payload,
          password: hashedPassword,
          refreshTokens: {
            create: [
              {
                expiryDate: this.generateRefreshTokenExpiryDate(),
              },
            ],
          },
          verification: {
            create: {
              verifyEmailExpiration: this.generateVerifyEmailTokenExpiryDate(),
              verifyEmailToken,
            },
          },
        },
      })

      return this.sendVerificationEmail({
        user,
        verifyEmailToken,
      })
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
        throw new ConflictException(`Email ${payload.email} already used.`)
      } else {
        throw new Error(e)
      }
    }
  }

  async verifyEmail(token: string) {
    const {
      user,
      ...verification
    } = await this.prisma.userVerification.findFirst({
      where: { verifyEmailToken: token },
      include: {
        user: true,
      },
    })

    if (!user) {
      throw new BadRequestException('Your verification code is invalid.')
    }

    if (new Date().getTime() > verification.verifyEmailExpiration.getTime()) {
      throw new BadRequestException('Your verification code has expired.')
    }

    await this.prisma.userVerification.update({
      where: {
        id: verification.id,
      },
      data: {
        verifiedEmail: true,
        verifyEmailToken: null,
        verifyEmailExpiration: null,
      },
    })

    const { accessToken, refreshToken } = await this.generateTokens({
      userId: user.id,
    })

    return {
      user,
      accessToken,
      refreshToken,
    }
  }

  async resendVerificationEmail(email: string) {
    const verifyEmailToken = await this.generateRandomToken()

    const user = await this.prisma.user.update({
      where: {
        email,
      },
      data: {
        verification: {
          update: {
            verifyEmailToken,
            verifyEmailExpiration: this.generateVerifyEmailTokenExpiryDate(),
          },
        },
      },
    })

    return this.sendVerificationEmail({
      user,
      verifyEmailToken,
    })
  }

  async sendVerificationEmail({
    user,
    verifyEmailToken,
    templateName = 'sign-up', // TODO: add a new template for "resend" verification email
  }: {
    user: User
    verifyEmailToken: string
    templateName?: string
  }) {
    const info = {
      to: this.mailService.getSingleDestination(user),
      subject: 'Welcome to Slatam!',
    }

    const clientURL = this.mailService.clientURL

    return await this.mailService.generate({
      templateName,
      info,
      data: {
        verifyEmailLink: `${clientURL}/verify-email?${verifyEmailToken}`,
        unsubscribeLink: `${clientURL}/unsubscribe?${user.id}`, // TODO: move the unsubscribe link to a default data object inside the mail service
      },
    })
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        verification: true,
      },
    })

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`)
    }

    if (!user.verification.verifiedEmail) {
      throw new BadRequestException('Please, verify your email.')
    }

    const passwordValid = await this.passwordService.validatePassword(
      password,
      user.password
    )

    if (!passwordValid) {
      throw new BadRequestException('Invalid password')
    }

    const { accessToken, refreshToken } = await this.generateTokens({
      userId: user.id,
    })

    return {
      user,
      accessToken,
      refreshToken,
    }
  }

  async sendResetEmail(email: string) {
    const resetPasswordToken = await this.generateRandomToken()
    const user = await this.prisma.user.update({
      where: { email },
      data: {
        resetPasswordToken,
        resetPasswordExpiration: this.generateVerifyEmailTokenExpiryDate(),
      },
    })

    const info = {
      to: this.mailService.getSingleDestination(user),
      subject: 'Reset your password',
    }

    const clientURL = this.mailService.clientURL

    return await this.mailService.generate({
      templateName: 'reset-password',
      info,
      data: {
        resetPasswordLink: `${clientURL}/reset-password?${resetPasswordToken}`,
        unsubscribeLink: `${clientURL}/unsubscribe?${user.id}`, // TODO: move the unsubscribe link to a default data object inside the mail service
      },
    })
  }

  async resetPassword({
    password,
    resetPasswordToken,
  }: {
    password: string
    resetPasswordToken: string
  }) {
    const user = await this.prisma.user.findFirst({
      where: {
        resetPasswordToken,
      },
    })

    if (!user) {
      throw new BadRequestException('Invalid reset password link.')
    }

    if (new Date().getTime() > user.resetPasswordExpiration.getTime()) {
      throw new BadRequestException(
        'Your time to change the password has expired. Please ask for a new reset link.'
      )
    }

    return await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: await this.passwordService.hashPassword(password),
        resetPasswordExpiration: null,
        resetPasswordToken: null,
      },
    })
  }

  validateUserById(userId: number): Promise<User> {
    return this.prisma.user.findFirst({
      where: { id: userId },
      include: {
        companyMember: true,
      },
    })
  }

  getUserFromAccessToken(token: string): Promise<User> | null {
    const id = this.jwtService.decode(token)?.['userId']

    if (!id) {
      throw new NotFoundException(`Invalid access token`)
    }

    return this.prisma.user.findFirst({ where: { id } })
  }

  async generateTokens({ userId }: { userId: number }) {
    const accessToken = this.jwtService.sign({ userId })

    const refreshToken = await this.prisma.refreshToken.create({
      data: {
        expiryDate: this.generateRefreshTokenExpiryDate(),
        user: {
          connect: {
            id: userId,
          },
        },
      },
    })

    return {
      accessToken,
      refreshToken,
    }
  }

  async refreshAccessToken(refreshTokenId: string) {
    try {
      const {
        user,
        userId,
        ...currentRefreshToken
      } = await this.prisma.refreshToken.findFirst({
        where: {
          id: refreshTokenId,
        },
        include: {
          user: true,
        },
      })

      if (
        !currentRefreshToken ||
        new Date().getTime() > currentRefreshToken.expiryDate.getTime()
      ) {
        throw new Error()
      }

      // Here we revoke the existing RefreshToken because
      // it should be used only one time (if it is compromised, it does not work anymore)
      await this.removeRefreshToken(refreshTokenId)

      // Generate new accessToken and refreshToken for the user
      const { accessToken, refreshToken } = await this.generateTokens({
        userId,
      })

      return {
        user,
        accessToken,
        refreshToken,
      }
    } catch (e) {
      throw new UnauthorizedException('Unauthorized! Please login again.')
    }
  }

  generateVerifyEmailTokenExpiryDate() {
    const securityConfig = this.configService.get<SecurityConfig>('security')
    const refreshTime = ms(securityConfig.verifyEmailTokenExpiresIn)
    return new Date(Date.now() + refreshTime)
  }

  generateRefreshTokenExpiryDate() {
    const securityConfig = this.configService.get<SecurityConfig>('security')
    const refreshTime = ms(securityConfig.refreshTokenExpiresIn)
    return new Date(Date.now() + refreshTime)
  }

  removeRefreshToken(tokenId: string): Promise<any> {
    return this.prisma.refreshToken.delete({
      where: {
        id: tokenId,
      },
    })
  }

  removeAllRefreshTokens(userId: number) {
    return this.prisma.refreshToken.deleteMany({
      where: {
        userId: {
          equals: userId,
        },
      },
    })
  }

  async generateRandomToken() {
    return (await promisify(randomBytes)(20)).toString('hex')
  }
}
