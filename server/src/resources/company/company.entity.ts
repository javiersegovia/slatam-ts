import { ObjectType } from '@nestjs/graphql'
import { BaseEntityInt } from '@resources/base/base.entity'
import { CompanyMember } from './company-member/company-member.entity'

@ObjectType()
export class Company extends BaseEntityInt {
  name: string
  members: CompanyMember[]
}
