import { ObjectType } from '@nestjs/graphql'
import { RefreshToken } from './refresh-token.entity'

@ObjectType()
export class Tokens {
  /**
   * 'JWT access token'
   */
  accessToken: string

  /**
   * 'JWT refresh token'
   */
  refreshToken: RefreshToken
}
