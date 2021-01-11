import { ObjectType } from '@nestjs/graphql'
import { User } from '../user/user.entity'

@ObjectType()
export class AuthPayload {
  user: User
  accessToken: string
}
