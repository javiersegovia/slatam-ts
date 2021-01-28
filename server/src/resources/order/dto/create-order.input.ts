import { InputType } from '@nestjs/graphql'
import { CreateOrderProductInput } from '../order-product/dto/create-order-product.input'
@InputType()
export class CreateOrderInput {
  products: CreateOrderProductInput[]
}
