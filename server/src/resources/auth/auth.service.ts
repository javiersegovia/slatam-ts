import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common'

import { User } from '@prisma/client'
import { SecurityConfig } from '@config/config.interface'

import { ConfigService } from '@nestjs/config'
import { PrismaService } from '../prisma/prisma.service'
import { PasswordService } from './password.service'
import { ErrorService } from '@resources/error/error.service'

import { SignupInput } from './dto/sign-up.input'
import { MailService } from '@mails/mail.service'
import { randomBytes } from 'crypto'
import { promisify } from 'util'
import ms from 'ms'
import { Request } from 'express'
import { UserVerification } from '@resources/user/user-verification.entity'

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
    private readonly errorService: ErrorService
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
      return this.errorService.handleUnknownError(e)
    }
  }

  async verifyEmail(token: string) {
    if (!token) {
      // TODO: the token presence should be validated in a "VerifyEmailInput"
      throw new BadRequestException('Your verification code is invalid.')
    }

    const verification = await this.prisma.userVerification.findFirst({
      where: { verifyEmailToken: token },
    })

    if (!verification) {
      throw new BadRequestException('Your verification code is invalid.')
    }

    if (new Date().getTime() > verification.verifyEmailExpiration.getTime()) {
      throw new BadRequestException('Your verification code has expired.')
    }

    const {
      user: verifiedUser,
      ...updatedVerification
    } = await this.prisma.userVerification.update({
      where: {
        id: verification.id,
      },
      data: {
        verifiedEmail: true,
        verifyEmailToken: null,
        verifyEmailExpiration: null,
      },
      include: {
        user: true,
      },
    })

    return {
      ...verifiedUser,
      verification: updatedVerification,
    }
  }

  async resendVerificationEmail(email: string) {
    const verifyEmailToken = await this.generateRandomToken()

    const userVerification = await this.prisma.user
      .findUnique({
        where: {
          email,
        },
      })
      .verification()

    if (userVerification.verifiedEmail) {
      return false
    }

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
        verifyEmailLink: `${clientURL}/s/verify-email?token=${verifyEmailToken}`,
        unsubscribeLink: `${clientURL}/unsubscribe?userId=${user.id}`, // TODO: move the unsubscribe link to a default data object inside the mail service
      },
    })
  }

  // TODO: create a config with the client-side routes to handle links in emails

  async sessionLogIn(
    req: Request,
    user: Omit<User, 'password'> & {
      verification: UserVerification
    }
  ) {
    return req.logIn(user, (err) => {
      if (err) {
        throw new Error(err)
      }
    })
  }

  // TOOD: refactor this login to work directly on the Local Guard auth

  async signIn(email: string, password: string) {
    const result = await this.prisma.user.findUnique({
      where: { email },
      include: {
        verification: true,
      },
    })

    if (!result) {
      throw new BadRequestException('INVALID')
    }

    const { password: userPassword, ...user } = result

    const passwordValid = await this.passwordService.validatePassword(
      password,
      userPassword
    )

    if (!passwordValid) {
      throw new BadRequestException('INVALID')
    }

    if (!user.verification?.verifiedEmail) {
      // TODO: move this error messages to a enum
      throw new UnauthorizedException('UNVERIFIED')
    }

    return user
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

    // TODO: move the routes to a centralized file in config
    return this.mailService.generate({
      templateName: 'reset-password',
      info,
      data: {
        resetPasswordLink: `${clientURL}/s/change-password?resetPasswordToken=${resetPasswordToken}`,
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

    return this.prisma.user.update({
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

  generateVerifyEmailTokenExpiryDate() {
    const securityConfig = this.configService.get<SecurityConfig>('security')
    const refreshTime = ms(securityConfig.verifyEmailTokenExpiresIn)
    return new Date(Date.now() + refreshTime)
  }

  async generateRandomToken() {
    return (await promisify(randomBytes)(20)).toString('hex')
  }
}
