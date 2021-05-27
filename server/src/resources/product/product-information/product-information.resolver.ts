import { Resolver, ResolveField, Root } from '@nestjs/graphql'
import { Category } from '@resources/category/category.entity'
import { PrismaService } from '@resources/prisma/prisma.service'
import { Product } from '../product.entity'
import { ProductInformation } from './product-information.entity'

@Resolver(ProductInformation)
export class ProductInformationResolver {
  constructor(private prisma: PrismaService) {}

  @ResolveField('category', () => Category)
  category(@Root() productInformation: ProductInformation) {
    return this.prisma.productInformation
      .findUnique({
        where: { id: productInformation.id },
      })
      .category()
  }

  @ResolveField('product', () => Product)
  product(@Root() productInformation: ProductInformation) {
    return this.prisma.productInformation
      .findUnique({
        where: { id: productInformation.id },
      })
      .product()
  }
}
