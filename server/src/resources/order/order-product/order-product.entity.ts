import { ObjectType } from '@nestjs/graphql'
import { BaseEntityInt } from '@resources/base/base.entity'
import { Order } from '../order.entity'
import { Company } from '@resources/company/company.entity'

@ObjectType()
export class OrderProduct extends BaseEntityInt {
  name: string
  price: number
  quantity: number
  description?: string
  seller: Company
  order: Order
}
