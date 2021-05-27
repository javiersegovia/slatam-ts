import { InputType } from '@nestjs/graphql'
import { CreateOrderProductInput } from '../order-product/dto/create-order-product.input'
import { IsNotEmpty, IsNumber } from 'class-validator'
@InputType()
export class CreateOrderInput {
  products: CreateOrderProductInput[]

  @IsNotEmpty()
  @IsNumber()
  buyerId: number

  @IsNotEmpty()
  @IsNumber()
  sellerId: number
}
