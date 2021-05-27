import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService } from './auth.service'

// TODO: check if we can delete this strategy
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super()
  }

  async validate(username: string, password: string, done: any) {
    const user = await this.authService.signIn(username, password)

    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
