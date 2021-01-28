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
    const { READ, UPDATE, DELETE, CREATE } = Action

    // TODO make a user to update only their company
    can(READ, Company)
    can(CREATE, Company)

    if (permissions.isMember) {
      cannot(CREATE, Company)
    }
    if (permissions.isManager) {
      can(UPDATE, Company)
    }
    if (permissions.isOwner) {
      can(DELETE, Company)
    }
  }
}
