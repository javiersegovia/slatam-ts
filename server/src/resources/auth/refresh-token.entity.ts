import { Field, ID, ObjectType } from '@nestjs/graphql'
import { User } from '../user/user.entity'

@ObjectType()
export class RefreshToken {
  @Field((_type) => ID)
  id: string
  expiryDate: Date
  user: User
}
