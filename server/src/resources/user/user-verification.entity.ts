import { ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UserVerification {
  verifiedEmail: boolean
}
