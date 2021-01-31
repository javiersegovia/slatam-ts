import { InputType } from '@nestjs/graphql'
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  IsOptional,
} from 'class-validator'
import { productValidationConstants } from '@constants/validation'

const {
  PRODUCT_NAME_MIN_LENGTH,
  PRODUCT_NAME_MAX_LENGTH,
  PRODUCT_DESCRIPTION_MIN_LENGTH,
  PRODUCT_DESCRIPTION_MAX_LENGTH,
} = productValidationConstants

@InputType()
export class UpdateOrderProductInput {
  @IsNotEmpty()
  @IsNumber()
  id: number

  @IsNotEmpty()
  @IsString()
  @Length(PRODUCT_NAME_MIN_LENGTH, PRODUCT_NAME_MAX_LENGTH)
  name: string

  @IsNotEmpty()
  @IsNumber()
  price: number

  @IsNotEmpty()
  @IsNumber()
  quantity: number

  @IsOptional()
  @IsString()
  @Length(PRODUCT_DESCRIPTION_MIN_LENGTH, PRODUCT_DESCRIPTION_MAX_LENGTH)
  description?: string
}
