import { InputType } from '@nestjs/graphql'
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  IsOptional,
} from 'class-validator'

@InputType()
export class CreateOrderProductInput {
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  name: string

  @IsNotEmpty()
  @IsNumber()
  price: number

  @IsNotEmpty()
  @IsNumber()
  quantity: number

  @IsOptional()
  @IsString()
  @Length(10, 150)
  description?: string

  @IsNotEmpty()
  @IsNumber()
  sellerId: number
}
