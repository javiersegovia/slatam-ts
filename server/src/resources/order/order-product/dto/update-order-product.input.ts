import { InputType } from '@nestjs/graphql'
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  IsOptional,
} from 'class-validator'

@InputType()
export class UpdateOrderProductInput {
  @IsNotEmpty()
  @IsNumber()
  id: number

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
}
