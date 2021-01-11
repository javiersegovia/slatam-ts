// import 'reflect-metadata'
import { ObjectType, registerEnumType, HideField } from '@nestjs/graphql'
import { IsEmail } from 'class-validator'
import { BaseEntity } from '../base/base.entity'
import { Post } from '../post/post.entity'

export enum Role {
  ADMIN = 'ADMIN',
  BUYER = 'BUYER',
  SELLER = 'BUYER',
}

registerEnumType(Role, {
  name: 'Role',
  description: 'User role',
})

@ObjectType()
export class User extends BaseEntity<number> {
  @IsEmail()
  email: string
  roles: Role[]

  firstName?: string
  lastName?: string
  posts?: Post[]

  @HideField()
  password: string
}
