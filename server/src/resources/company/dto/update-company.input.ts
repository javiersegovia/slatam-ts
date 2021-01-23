import { IsNotEmpty, IsString, Length, IsNumber } from 'class-validator'
import { InputType } from '@nestjs/graphql'

@InputType()
export class UpdateCompanyInput {
  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  name: string

  @IsNotEmpty()
  @IsNumber()
  id: number
}
