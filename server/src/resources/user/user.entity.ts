// import 'reflect-metadata'
import { ObjectType, registerEnumType, HideField } from '@nestjs/graphql'
import { IsEmail } from 'class-validator'
import { BaseEntity } from '../base'
import { Post } from '../post'

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

registerEnumType(Role, {
  name: 'Role',
  description: 'User role',
})

@ObjectType()
export class User extends BaseEntity<number> {
  @IsEmail()
  email: string
  role: Role

  firstName?: string
  lastName?: string
  posts?: Post[]

  @HideField()
  password: string
}