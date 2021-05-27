import { InputType } from '@nestjs/graphql'
import { UpdateOrderProductInput } from '../order-product/dto/update-order-product.input'
import { IsNotEmpty, IsNumber } from 'class-validator'

@InputType()
export class UpdateOrderInput {
  @IsNotEmpty()
  @IsNumber()
  id: number

  @IsNotEmpty()
  @IsNumber()
  buyerId: number

  @IsNotEmpty()
  @IsNumber()
  sellerId: number

  products: UpdateOrderProductInput[]
}
