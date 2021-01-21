import { IsNotEmpty, Length, IsUppercase, IsUrl } from 'class-validator'
import { InputType } from '@nestjs/graphql'

@InputType()
export class UpdateCountryInput {
  @IsNotEmpty()
  id: number

  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  @IsUrl()
  flag: string

  @IsNotEmpty()
  @Length(2)
  @IsUppercase()
  code2: string
}
