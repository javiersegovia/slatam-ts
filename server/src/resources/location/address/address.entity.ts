import { ObjectType } from '@nestjs/graphql'
import { BaseEntity } from '@resources/base/base.entity'
import { CompanyInformation } from '@resources/company/company-information.entity'
import { Country } from '@resources/country/country.entity'
import { UserInformation } from '@resources/user/user-information.entity'

@ObjectType()
export class Address extends BaseEntity {
  country: Country
  //TODO: rename owner field to "userInfo"
  owner?: UserInformation
  companyInfo?: CompanyInformation

  description?: string
  postalCode?: string
}
