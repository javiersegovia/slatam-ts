import { ObjectType } from '@nestjs/graphql'
import { User } from '../user/user.entity'
import { BaseEntity } from '../base/base.entity'

@ObjectType()
export class Post extends BaseEntity {
  title: string
  content?: string
  published: boolean
  author?: User
}
