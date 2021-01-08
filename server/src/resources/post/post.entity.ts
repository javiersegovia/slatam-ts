import { ObjectType } from '@nestjs/graphql'
import { User } from '../user'
import { BaseEntity } from '../base'

@ObjectType()
export class Post extends BaseEntity {
  title: string
  content?: string
  published: boolean
  author?: User
}
