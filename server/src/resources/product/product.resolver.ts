import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Parent, ResolveField } from '@nestjs/graphql'
import { PrismaService } from '@resources/prisma/prisma.service'
import { Product } from './product.entity'
import { ProductService } from './product.service'
import { IsAuthGuard } from '@guards/is-auth.guard'

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

  @UseGuards(IsAuthGuard)
  @Query(() => [Product], { nullable: true })
  getAllProducts() {
    return this.productService.getAllProducts()
  }

  @ResolveField('owner')
  async owner(@Parent() product: Product) {
    return this.prisma.product.findUnique({ where: { id: product.id } }).owner()
  }
}
