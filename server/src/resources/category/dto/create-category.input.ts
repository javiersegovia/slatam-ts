import { IsNotEmpty } from 'class-validator'
import { InputType } from '@nestjs/graphql'

@InputType()
export class CreateCategoryInput {
  @IsNotEmpty()
  name: string
}
