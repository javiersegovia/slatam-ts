import { Request, Response } from 'express'
import { Resolver, Mutation, Args, Context } from '@nestjs/graphql'
import { AuthPayload } from './auth-payload.entity'
import { AuthService } from './auth.service'
import { LoginInput } from './dto/login.input'
import { SignupInput } from './dto/signup.input'
import { ResetPasswordInput } from './dto/reset-password.input'

export const REFRESH_TOKEN_ID_COOKIE = 'REFRESH_TOKEN_ID'

// TODO: move this to securityConfig
const refreshTokenConfig = { httpOnly: true }

// TODO: fix input validations (they are not working right now)

@Resolver((_of) => AuthPayload)
export class AuthResolver {
  constructor(private readonly auth: AuthService) {}

  @Mutation((_returns) => Boolean)
  async register(@Args('data') data: SignupInput) {
    data.email = data.email.toLowerCase()

    await this.auth.createUser(data)

    return true
  }

  @Mutation((_returns) => AuthPayload)
  async verifyEmail(
    @Args('token') token: string,
    @Context('res') res: Response
  ) {
    const { user, refreshToken, accessToken } = await this.auth.verifyEmail(
      token
    )

    res.cookie(REFRESH_TOKEN_ID_COOKIE, refreshToken.id, refreshTokenConfig)

    return {
      user,
      accessToken,
    }
  }

  @Mutation((_returns) => Boolean)
  async resendVerificationEmail(@Args('email') email: string) {
    await this.auth.resendVerificationEmail(email)

    return true
  }

  @Mutation((_returns) => AuthPayload)
  async login(
    @Args('data') { email, password }: LoginInput,
    @Context('res') res: Response
  ) {
    const { user, refreshToken, accessToken } = await this.auth.login(
      email.toLowerCase(),
      password
    )

    res.cookie(REFRESH_TOKEN_ID_COOKIE, refreshToken.id, refreshTokenConfig)

    return {
      user,
      accessToken,
    }
  }

  @Mutation((_returns) => AuthPayload)
  refreshAccessToken(@Context('req') req: Request) {
    const refreshTokenId = req.cookies[REFRESH_TOKEN_ID_COOKIE]
    return this.auth.refreshAccessToken(refreshTokenId)
  }

  @Mutation((_returns) => Boolean)
  async logout(@Context('req') req: Request, @Context('res') res: Response) {
    const refreshTokenId = req.cookies[REFRESH_TOKEN_ID_COOKIE]

    if (refreshTokenId) {
      await this.auth.removeRefreshToken(refreshTokenId)
    }

    res.clearCookie(REFRESH_TOKEN_ID_COOKIE)

    return true
  }

  @Mutation((_returns) => Boolean)
  async logoutFromAllDevices(
    @Args('userId') userId: number,
    @Context('res') res: Response
  ) {
    await this.auth.removeAllRefreshTokens(userId)
    res.clearCookie(REFRESH_TOKEN_ID_COOKIE)

    return true
  }

  @Mutation((_returns) => Boolean)
  async requestResetPassword(@Args('email') email: string) {
    await this.auth.sendResetEmail(email)
    return true
  }

  @Mutation((_returns) => Boolean)
  async resetPassword(
    @Args('data') { password, resetPasswordToken }: ResetPasswordInput
  ) {
    await this.auth.resetPassword({
      password,
      resetPasswordToken,
    })
    return true
  }
}
