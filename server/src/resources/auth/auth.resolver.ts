import { Request } from 'express'
import { Resolver, Mutation, Args, Context } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { SignInInput } from './dto/sign-in.input'
import { SignupInput } from './dto/sign-up.input'
import { ResetPasswordInput } from './dto/reset-password.input'
import { User } from '@resources/user/user.entity'

// import { CurrentUser } from '@decorators/current-user.decorator'

export const REFRESH_TOKEN_ID_COOKIE = 'REFRESH_TOKEN_ID'
export const ACCESS_TOKEN_COOKIE = 'ACCESS_TOKEN_COOKIE'

// TODO: fix input validations (they are not working right now)

@Resolver()
export class AuthResolver {
  constructor(private readonly auth: AuthService) {}

  @Mutation((_returns) => Boolean)
  async register(@Args('data') data: SignupInput) {
    data.email = data.email.toLowerCase()
    await this.auth.createUser(data)

    return true
  }

  @Mutation((_returns) => Boolean)
  async verifyEmail(
    @Args('token') token: string,
    @Context('req') req: Request
  ) {
    const verifiedUser = await this.auth.verifyEmail(token)
    await this.auth.sessionLogIn(req, verifiedUser)

    return true
  }

  @Mutation((_returns) => Boolean)
  async resendVerificationEmail(@Args('email') email: string) {
    const success = await this.auth.resendVerificationEmail(email)
    return !!success
  }

  @Mutation((_returns) => User)
  async login(
    @Context('req') req: Request,
    @Args('data') { email, password }: SignInInput
  ) {
    const user = await this.auth.signIn(email, password)
    await this.auth.sessionLogIn(req, user)

    return user
  }

  @Mutation((_returns) => Boolean)
  async logout(@Context('req') req: Request) {
    await req.logout()
    await req.session.destroy(() => true)

    return true
  }

  // TODO: implement logoutFromAllDevices when we have a Session Store

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
