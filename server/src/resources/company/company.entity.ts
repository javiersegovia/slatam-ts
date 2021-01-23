import { ObjectType } from '@nestjs/graphql'
import { BaseEntityInt } from '@resources/base/base.entity'
import { CompanyInformation } from './company-information.entity'
import { CompanyMember } from './company-member/company-member.entity'

@ObjectType()
export class Company extends BaseEntityInt {
  name: string
  information?: CompanyInformation
  members: CompanyMember[]
}
