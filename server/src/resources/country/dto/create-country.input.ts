import {
  IsNotEmpty,
  Length,
  IsUppercase,
  IsUrl,
  IsString,
} from 'class-validator'
import { InputType } from '@nestjs/graphql'
@InputType()
export class CreateCountryInput {
  @IsNotEmpty()
  @Length(2)
  @IsUppercase()
  @IsString()
  code2: string

  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsUrl()
  @IsString()
  flag: string
}
