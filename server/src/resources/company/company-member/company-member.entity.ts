import { ObjectType, registerEnumType } from '@nestjs/graphql'
import { BaseEntity } from '@resources/base/base.entity'
import { User } from '@resources/user/user.entity'
import { Company } from '../company.entity'

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
export class CompanyMember extends BaseEntity<number> {
  user: User
  company: Company
  roles: CompanyMemberRole[]
}
