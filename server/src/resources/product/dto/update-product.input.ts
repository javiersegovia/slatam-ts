import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator'
import { Field, InputType } from '@nestjs/graphql'
import { productValidationConstants } from '@constants/validation'
import { Upload } from '@lib/scalars'
import { FileUpload } from 'graphql-upload'
import { Exclude } from 'class-transformer'
import { ProductStatus } from '../product.entity'
import { CreateOrUpdateProductInformationInput } from './create-product.input'

const {
  PRODUCT_NAME_MIN_LENGTH,
  PRODUCT_NAME_MAX_LENGTH,
} = productValidationConstants

@InputType()
export class UpdateProductInput {
  @IsNotEmpty()
  @IsString()
  @Length(PRODUCT_NAME_MIN_LENGTH, PRODUCT_NAME_MAX_LENGTH)
  name: string

  @IsNotEmpty()
  @IsNumber()
  price: number

  information?: CreateOrUpdateProductInformationInput

  @IsNotEmpty()
  @IsNumber()
  id: number

  @IsNotEmpty()
  status: ProductStatus

  @Exclude()
  @Field(() => [Upload])
  newImages?: FileUpload[]

  existingImages?: string[]
}
