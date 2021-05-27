import { Injectable } from '@nestjs/common'
import { Product } from './product.entity'
import { BaseAbility, Action } from '@resources/base/base.ability'
import { Ability } from '@casl/ability'
import { TCurrentUser } from '@resources/auth/session.serializer'

export { Action }

type TProductSubjects = typeof Product | Product

const { READ, UPDATE, DELETE, CREATE } = Action

@Injectable()
export class ProductAbility extends BaseAbility<TProductSubjects> {
  create(user?: TCurrentUser): Ability<[Action, TProductSubjects]> {
    const { builder, permissions } = this.createBuilder(user)
    this.defineRules({ builder, permissions })
    return builder.build()
  }

  defineRules({ builder: { can }, permissions }) {
    can(READ, Product) // TODO make a user to update only their products, based on their company

    if (permissions.isMember) {
      can(CREATE, Product)
      can(UPDATE, Product)
      can(DELETE, Product)
    }
  }
}
