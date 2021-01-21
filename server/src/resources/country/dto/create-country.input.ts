import { IsNotEmpty, Length, IsUppercase, IsUrl } from 'class-validator'
import { InputType } from '@nestjs/graphql'
@InputType()
export class CreateCountryInput {
  @IsNotEmpty()
  @Length(2)
  @IsUppercase()
  code2: string

  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  @IsUrl()
  flag: string
}
