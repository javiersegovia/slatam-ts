import { IsNotEmpty, IsString, Length } from 'class-validator'
import { InputType } from '@nestjs/graphql'
import { CreateOrUpdateAddressInput } from '@resources/location/address/dto/create-or-update-address.input'
import { CountryInput } from '@resources/country/dto/country.input'
import { CategoryInput } from '@resources/category/dto/category.input'
import { companyValidationConstants } from '@constants/validation'

const {
  COMPANY_NAME_MIN_LENGTH,
  COMPANY_NAME_MAX_LENGTH,
  COMPANY_DESCRIPTION_MIN_LENGTH,
  COMPANY_DESCRIPTION_MAX_LENGTH,
} = companyValidationConstants

@InputType()
export class CreateCompanyInput {
  @IsNotEmpty()
  @IsString()
  @Length(COMPANY_NAME_MIN_LENGTH, COMPANY_NAME_MAX_LENGTH)
  name: string

  information?: UpdateCompanyInformationInput
}

@InputType()
export class UpdateCompanyInformationInput {
  @IsString()
  @Length(COMPANY_DESCRIPTION_MIN_LENGTH, COMPANY_DESCRIPTION_MAX_LENGTH)
  description?: string

  address?: CreateOrUpdateAddressInput
  categories?: CategoryInput[]
  country?: CountryInput
}
