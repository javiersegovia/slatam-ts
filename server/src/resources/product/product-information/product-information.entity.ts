import { ObjectType } from '@nestjs/graphql'
import { BaseEntity } from '@resources/base/base.entity'
import { Category } from '@resources/category/category.entity'
import { Product } from '../product.entity'

@ObjectType()
export class ProductInformation extends BaseEntity {
  description?: string
  category?: Category
  product: Product
}
