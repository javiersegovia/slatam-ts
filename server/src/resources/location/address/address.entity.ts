import { ObjectType } from '@nestjs/graphql'
import { BaseEntity } from '@resources/base/base.entity'
import { Country } from '@resources/country/country.entity'
import { UserInformation } from '@resources/user/user-information.entity'

@ObjectType()
export class Address extends BaseEntity {
  country: Country
  owner: UserInformation

  description?: string
  postalCode?: string
}
