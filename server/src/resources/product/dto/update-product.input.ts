import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  IsOptional,
} from 'class-validator'
import { InputType } from '@nestjs/graphql'

@InputType()
export class UpdateProductInput {
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  name: string

  @IsNotEmpty()
  @IsNumber()
  price: number

  @IsOptional()
  @IsString()
  @Length(10, 150)
  description?: string

  @IsNotEmpty()
  @IsNumber()
  id: number
}
