import { IsNotEmpty, IsString, Length } from 'class-validator'
import { InputType } from '@nestjs/graphql'

@InputType()
export class CreateCompanyInput {
  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  name: string
}
