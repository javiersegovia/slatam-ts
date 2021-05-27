import { IsNotEmpty, MinLength } from 'class-validator'
import { InputType } from '@nestjs/graphql'
import { CountryInput } from '../../../country/dto/country.input'

@InputType()
export class CreateOrUpdateAddressInput {
  @MinLength(8)
  description?: string

  @IsNotEmpty()
  country: CountryInput

  postalCode?: string
}
