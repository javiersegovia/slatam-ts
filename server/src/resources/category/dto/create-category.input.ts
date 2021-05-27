import { IsNotEmpty, IsString } from 'class-validator'
import { InputType } from '@nestjs/graphql'

@InputType()
export class CreateCategoryInput {
  @IsNotEmpty()
  @IsString()
  name: string
}
