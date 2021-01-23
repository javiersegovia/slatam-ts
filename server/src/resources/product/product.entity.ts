import { ObjectType, registerEnumType } from '@nestjs/graphql'
import { BaseEntityInt } from '../base/base.entity'
import { Company } from '../company/company.entity'

export enum ProductStatus {
  INACTIVE = 'INACTIVE',
  ACTIVE = 'ACTIVE',
}

registerEnumType(ProductStatus, {
  name: 'ProductStatus',
  description: 'Product status (visibility) role',
})

@ObjectType()
export class Product extends BaseEntityInt {
  name: string
  description?: string
  status: ProductStatus
  owner: Company
}
