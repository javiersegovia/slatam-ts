import { ObjectType } from '@nestjs/graphql'
import { BaseEntity } from '../base/base.entity'
import { CompanyMember } from './company-member/company-member.entity'

@ObjectType()
export class Company extends BaseEntity<number> {
  name: string
  members: CompanyMember[]
}
