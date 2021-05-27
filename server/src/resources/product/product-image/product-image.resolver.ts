import { Resolver, ResolveField, Root } from '@nestjs/graphql'
import { PrismaService } from '@resources/prisma/prisma.service'
import { ProductImage } from './product-image.entity'
import { Image } from '@resources/file/image/image.entity'

@Resolver(ProductImage)
export class ProductImageResolver {
  constructor(private prisma: PrismaService) {}

  @ResolveField('large', () => Image)
  large(@Root() productImage: ProductImage) {
    return this.prisma.productImage
      .findUnique({
        where: { id: productImage.id },
      })
      .large()
  }

  @ResolveField('thumbnail', () => Image)
  thumbnail(@Root() productImage: ProductImage) {
    return this.prisma.productImage
      .findUnique({
        where: { id: productImage.id },
      })
      .thumbnail()
  }

  @ResolveField('small', () => Image)
  small(@Root() productImage: ProductImage) {
    return this.prisma.productImage
      .findUnique({
        where: { id: productImage.id },
      })
      .small()
  }
  @ResolveField('product', () => Image)
  product(@Root() productImage: ProductImage) {
    return this.prisma.productImage
      .findUnique({
        where: { id: productImage.id },
      })
      .product()
  }
}
