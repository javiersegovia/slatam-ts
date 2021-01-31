import { IsNotEmpty, IsString, Length, IsNumber } from 'class-validator'
import { InputType } from '@nestjs/graphql'
import { companyValidationConstants } from '@constants/validation'

const {
  COMPANY_NAME_MIN_LENGTH,
  COMPANY_NAME_MAX_LENGTH,
} = companyValidationConstants

@InputType()
export class UpdateCompanyInput {
  @IsNotEmpty()
  @IsString()
  @Length(COMPANY_NAME_MIN_LENGTH, COMPANY_NAME_MAX_LENGTH)
  name: string

  @IsNotEmpty()
  @IsNumber()
  id: number
}
