import { IsNotEmpty, IsString, Length } from 'class-validator'
import { InputType } from '@nestjs/graphql'
import { CreateOrUpdateAddressInput } from '@resources/location/address/dto/create-or-update-address.input'
import { CountryInput } from '@resources/country/dto/country.input'
import { CategoryInput } from '@resources/category/dto/category.input'

@InputType()
export class CreateCompanyInput {
  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  name: string

  information?: UpdateCompanyInformationInput
}

@InputType()
export class UpdateCompanyInformationInput {
  @IsString()
  @Length(20, 200)
  description?: string

  address?: CreateOrUpdateAddressInput
  categories?: CategoryInput[]
  country?: CountryInput
}
