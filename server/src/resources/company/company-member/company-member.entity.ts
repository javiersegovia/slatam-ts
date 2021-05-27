import { ObjectType, registerEnumType } from '@nestjs/graphql'
import { User } from '@resources/user/user.entity'
import { Company } from '../company.entity'
import { BaseEntityInt } from '../../base/base.entity'

export enum CompanyMemberRole {
  MEMBER = 'MEMBER',
  MANAGER = 'MANAGER',
  OWNER = 'OWNER',
}

registerEnumType(CompanyMemberRole, {
  name: 'CompanyMemberRole',
  description: 'Company member role',
})

@ObjectType()
export class CompanyMember extends BaseEntityInt {
  user: User
  company: Company
  roles: CompanyMemberRole[]
}
