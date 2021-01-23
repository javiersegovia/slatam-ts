import { InputType } from '@nestjs/graphql'
import { BaseEntityInt } from '@resources/base/base.entity'

@InputType()
export class CreateOrderInput extends BaseEntityInt {
  name: string
  price: number
  quantity: number
  description?: string
  sellerId: number
}
