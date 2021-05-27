import { ObjectType } from '@nestjs/graphql'
import { BaseEntity } from '@resources/base/base.entity'
import { Image } from '@resources/file/image/image.entity'
import { Product } from '../product.entity'

// TODO: analyze the proper sizes

@ObjectType()
export class ProductImage extends BaseEntity {
  large: Image
  thumbnail: Image
  small: Image
  product: Product
}
