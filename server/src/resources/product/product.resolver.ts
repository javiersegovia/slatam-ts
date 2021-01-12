import { IsAuthenticatedGuard } from '@guards/is-authenticated.guard'
import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Parent, ResolveField } from '@nestjs/graphql'
import { PrismaService } from '@resources/prisma/prisma.service'
import { Product } from './product.entity'
import { ProductService } from './product.service'

@Resolver(Product)
export class ProductResolver {
  constructor(
    private productService: ProductService,
    private prisma: PrismaService
  ) {}

  @Query(() => String)
  helloProduct() {
    return 'helloWorld product'
  }

  @UseGuards(IsAuthenticatedGuard)
  @Query(() => [Product], { nullable: true })
  getAllProducts() {
    return this.productService.getAllProducts()
  }

  @ResolveField('owner')
  async owner(@Parent() product: Product) {
    return this.prisma.product.findUnique({ where: { id: product.id } }).owner()
  }
}
