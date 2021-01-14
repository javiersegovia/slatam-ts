import { Resolver, Mutation, Args, Context } from '@nestjs/graphql'
import { AuthPayload } from './auth-payload.entity'
import { AuthService } from './auth.service'
import { LoginInput } from './dto/login.input'
import { SignupInput } from './dto/signup.input'
import { Request, Response } from 'express'

export const REFRESH_TOKEN_ID_COOKIE = 'REFRESH_TOKEN_ID'

// TODO: move this to securityConfig
const refreshTokenConfig = { httpOnly: true }

@Resolver((_of) => AuthPayload)
export class AuthResolver {
  constructor(private readonly auth: AuthService) {}

  @Mutation((_returns) => Boolean)
  async signup(@Args('data') data: SignupInput) {
    data.email = data.email.toLowerCase()

    await this.auth.createUser(data)

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

  async logout(@Context('req') req: Request, @Context('res') res: Response) {
    const refreshTokenId = req.cookies[REFRESH_TOKEN_ID_COOKIE]

    if (refreshTokenId) {
      await this.auth.removeRefreshToken(refreshTokenId)
    }

    res.clearCookie(REFRESH_TOKEN_ID_COOKIE)

    return true
  }

  async logoutFromAllDevices(
    @Args('userId') userId: number,
    @Context('res') res: Response
  ) {
    await this.auth.removeAllRefreshTokens(userId)
    res.clearCookie(REFRESH_TOKEN_ID_COOKIE)

    return true
  }
}
