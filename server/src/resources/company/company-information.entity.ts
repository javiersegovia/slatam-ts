import { ObjectType } from '@nestjs/graphql'
import { BaseEntity } from '@resources/base/base.entity'
import { Category } from '@resources/category/category.entity'
import { Country } from '@resources/country/country.entity'
import { Address } from '@resources/location/address/address.entity'
import { Company } from './company.entity'

@ObjectType()
export class CompanyInformation extends BaseEntity {
  company: Company
  country?: Country
  description?: string
  address?: Address[]
  categories?: Category[]
}
