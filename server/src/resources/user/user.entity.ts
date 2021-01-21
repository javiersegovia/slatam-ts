// import 'reflect-metadata'
import { ObjectType, HideField } from '@nestjs/graphql'
import { CompanyMember } from '@resources/company/company-member/company-member.entity'
import { IsEmail } from 'class-validator'
import { BaseEntity } from '../base/base.entity'
import { Post } from '../post/post.entity'
import { UserInformation } from './user-information.entity'
import { UserVerification } from './user-verification.entity'

@ObjectType()
export class User extends BaseEntity<number> {
  @IsEmail()
  email: string

  firstName?: string
  lastName?: string
  posts?: Post[]
  companyMember?: CompanyMember

  verification: UserVerification
  information?: UserInformation

  @HideField()
  password: string
}
