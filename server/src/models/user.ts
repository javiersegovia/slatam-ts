import 'reflect-metadata'
import { ObjectType, registerEnumType, HideField } from '@nestjs/graphql'
import { IsEmail } from 'class-validator'
import { BaseModel } from './base'

// import { Post } from './post'

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

registerEnumType(Role, {
  name: 'Role',
  description: 'User role',
})

@ObjectType()
export class User extends BaseModel {
  @IsEmail()
  email: string

  @HideField()
  password: string

  /**
   * The user's role
   */
  role: Role

  // @Field(() => [Post], { nullable: true })
  // posts?: [Post] | null

  first_name?: string | null
  last_name?: string | null
}
