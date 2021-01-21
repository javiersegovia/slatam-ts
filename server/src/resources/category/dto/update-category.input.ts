import { IsNotEmpty } from 'class-validator'
import { InputType } from '@nestjs/graphql'

@InputType()
export class UpdateCategoryInput {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  id: number
}
