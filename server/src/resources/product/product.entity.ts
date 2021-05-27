import { ObjectType, registerEnumType } from '@nestjs/graphql'
import { BaseEntityInt } from '../base/base.entity'
import { Company } from '../company/company.entity'
import { ProductImage } from './product-image/product-image.entity'
import { ProductInformation } from './product-information/product-information.entity'

export enum ProductStatus {
  INACTIVE = 'INACTIVE',
  ACTIVE = 'ACTIVE',
}

registerEnumType(ProductStatus, {
  name: 'ProductStatus',
  description: 'Product status (visibility) role',
})

// TODO: create productInformation and add category there
@ObjectType()
export class Product extends BaseEntityInt {
  name: string
  price: number
  information?: ProductInformation
  status: ProductStatus
  images?: ProductImage[]
  owner: Company
}
