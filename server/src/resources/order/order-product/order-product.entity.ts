import { ObjectType } from '@nestjs/graphql'
import { BaseEntityInt } from '@resources/base/base.entity'
import { Order } from '../order.entity'

@ObjectType()
export class OrderProduct extends BaseEntityInt {
  name: string
  price: number
  quantity: number
  description?: string
  order: Order
}
