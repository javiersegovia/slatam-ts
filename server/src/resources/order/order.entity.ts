import { ObjectType } from '@nestjs/graphql'
import { BaseEntityInt } from '../base/base.entity'
import { User } from '../user/user.entity'
import { Company } from '../company/company.entity'
import { OrderProduct } from './order-product/order-product.entity'

@ObjectType()
export class Order extends BaseEntityInt {
  products: OrderProduct[]
  totalPrice: number
  buyer: User
  seller: Company
}
