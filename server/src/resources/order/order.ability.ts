import { Injectable } from '@nestjs/common'
import { Order } from './order.entity'
import { BaseAbility, Action } from '@resources/base/base.ability'
import { Ability } from '@casl/ability'
import { TCurrentUser } from '@resources/auth/session.serializer'

export { Action }

type TOrderSubjects = typeof Order | Order

@Injectable()
export class OrderAbility extends BaseAbility<TOrderSubjects> {
  create(user: TCurrentUser | undefined): Ability<[Action, TOrderSubjects]> {
    const { builder } = this.createBuilder(user)
    this.defineRules({ builder })
    return builder.build()
  }

  defineRules({ builder: { can, cannot } }) {
    const { READ, UPDATE, DELETE, CREATE } = Action

    // TODO make a user to see only their orders
    can(READ, Order)
    can(CREATE, Order)
    cannot(DELETE, Order)
    cannot(UPDATE, Order)
  }
}
