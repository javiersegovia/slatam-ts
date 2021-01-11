import { ObjectType } from '@nestjs/graphql'

@ObjectType()
export class AccessToken {
  /**
   * JWT client access token
   */
  jwt: string
}
