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
import ms from 'ms'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly configService: ConfigService
  ) {}

  async createUser(payload: SignupInput) {
    const hashedPassword = await this.passwordService.hashPassword(
      payload.password
    )

    try {
      const { refreshTokens, ...user } = await this.prisma.user.create({
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
        },
        include: {
          refreshTokens: true,
        },
      })

      const accessToken = await this.jwtService.sign({ userId: user.id })

      return { user, accessToken, refreshTokenId: refreshTokens[0].id }
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
        throw new ConflictException(`Email ${payload.email} already used.`)
      } else {
        throw new Error(e)
      }
    }
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } })

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`)
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

  generateRefreshTokenExpiryDate() {
    const securityConfig = this.configService.get<SecurityConfig>('security')
    const refreshTime = ms(securityConfig.tokenRefreshIn)
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
}
