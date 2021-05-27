import { IsNotEmpty, IsString, IsNumber } from 'class-validator'
import { InputType } from '@nestjs/graphql'

@InputType()
export class UpdateCategoryInput {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsNumber()
  id: number
}
