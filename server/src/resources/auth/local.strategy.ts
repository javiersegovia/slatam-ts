import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService } from './auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super()
  }

  async validate(username: string, password: string, done: any) {
    const user = await this.authService.signIn(username, password)

    if (done) {
      console.log('Done function exists in validate')
    }

    console.log('User found inside validate')
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
