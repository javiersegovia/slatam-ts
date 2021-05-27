import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator'
import { Field, InputType } from '@nestjs/graphql'
import { productValidationConstants } from '@constants/validation'
import { ProductStatus } from '../product.entity'
import { Exclude } from 'class-transformer'
import { FileUpload } from 'graphql-upload'
import { Upload } from '@lib/scalars'
import { CategoryInput } from '../../category/dto/category.input'

// TODO: move this to config module and update the syntax
const {
  PRODUCT_NAME_MIN_LENGTH,
  PRODUCT_NAME_MAX_LENGTH,
  PRODUCT_DESCRIPTION_MIN_LENGTH,
  PRODUCT_DESCRIPTION_MAX_LENGTH,
} = productValidationConstants

@InputType() // TODO: move to another DTO
export class CreateOrUpdateProductInformationInput {
  @IsString()
  @Length(PRODUCT_DESCRIPTION_MIN_LENGTH, PRODUCT_DESCRIPTION_MAX_LENGTH)
  description?: string
  category?: CategoryInput
}

@InputType()
export class CreateProductInput {
  @IsNotEmpty()
  @IsString()
  @Length(PRODUCT_NAME_MIN_LENGTH, PRODUCT_NAME_MAX_LENGTH)
  name: string

  @IsNotEmpty()
  @IsNumber()
  price: number

  @IsNotEmpty()
  status: ProductStatus

  @Exclude()
  @Field(() => [Upload])
  images?: FileUpload[]

  information?: CreateOrUpdateProductInformationInput
}
