import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'

import { User } from '@prisma/client'
import { AuthService } from './auth.service'
import { ConfigService } from '@nestjs/config'
import { JwtDto } from './dto/jwt.dto'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
    })
  }

  async validate(payload: JwtDto): Promise<User> {
    const user = await this.authService.validateUserById(payload.userId)
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
