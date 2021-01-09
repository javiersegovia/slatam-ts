import { Resolver, Mutation, Args, Parent, ResolveField } from '@nestjs/graphql'
import { Auth } from './auth.entity'
import { Token } from './token.entity'
import { AuthService } from './auth.service'
import { LoginInput } from './dto/login.input'
import { SignupInput } from './dto/signup.input'
// import { User } from '../user/user.entity'

@Resolver((of) => Auth)
export class AuthResolver {
  constructor(private readonly auth: AuthService) {}

  @Mutation((returns) => Auth)
  async signup(@Args('data') data: SignupInput) {
    data.email = data.email.toLowerCase()

    const { accessToken, refreshToken } = await this.auth.createUser(data)
    return {
      accessToken,
      refreshToken,
    }
  }

  @Mutation((returns) => Auth)
  async login(@Args('data') { email, password }: LoginInput) {
    const { accessToken, refreshToken } = await this.auth.login(
      email.toLowerCase(),
      password
    )

    return {
      accessToken,
      refreshToken,
    }
  }

  @Mutation((returns) => Token)
  async refreshToken(@Args('token') token: string) {
    return this.auth.refreshToken(token)
  }

  @ResolveField('user')
  async user(@Parent() auth: Auth) {
    return await this.auth.getUserFromToken(auth.accessToken)
  }
}
