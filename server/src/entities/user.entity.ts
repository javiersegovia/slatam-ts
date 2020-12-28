// import 'reflect-metadata'
import { ObjectType, registerEnumType, HideField } from '@nestjs/graphql'
import { IsEmail } from 'class-validator'
import { BaseEntity } from './base.entity'
import { Post } from './post.entity'

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

registerEnumType(Role, {
  name: 'Role',
  description: 'User role',
})

@ObjectType()
export class User extends BaseEntity {
  @IsEmail()
  email: string
  role: Role

  first_name?: string
  last_name?: string
  posts?: Post[]

  @HideField()
  password: string
}
