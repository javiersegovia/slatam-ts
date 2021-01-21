import { Injectable } from '@nestjs/common'
import { Company } from './company.entity'
import { User } from '@resources/user/user.entity'
import { BaseAbility, Action } from '@resources/base/base.ability'
import { Ability } from '@casl/ability'

export { Action }

type TCompanySubjects = typeof Company | Company

@Injectable()
export class CompanyAbility extends BaseAbility<TCompanySubjects> {
  create(user: User | undefined): Ability<[Action, TCompanySubjects]> {
    const { builder, permissions } = this.createBuilder(user)
    this.defineRules({ builder, permissions })
    return builder.build()
  }

  defineRules({ builder: { can, cannot }, permissions }) {
    const { READ, UPDATE, DELETE, MANAGE } = Action

    cannot(MANAGE, Company)

    if (permissions.isMember) {
      can(READ, Company)
    }
    if (permissions.isManager) {
      can(READ, Company)
      can(UPDATE, Company)
    }
    if (permissions.isOwner) {
      can(MANAGE, Company)
      cannot(DELETE, Company)
    }
  }
}
