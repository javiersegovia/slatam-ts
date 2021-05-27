import {
  Resolver,
  Query,
  Parent,
  ResolveField,
  Args,
  Mutation,
  Int,
} from '@nestjs/graphql'
import { PrismaService } from '@resources/prisma/prisma.service'
import { Product, ProductStatus } from './product.entity'
import { ProductService } from './product.service'
import { CurrentUser } from '@decorators/current-user.decorator'
import { IsAuthGuard } from '@guards/is-auth.guard'
import { UseGuards } from '@nestjs/common'
import { ForbiddenException } from '@nestjs/common'
import { CreateProductInput } from './dto/create-product.input'
import { UpdateProductInput } from './dto/update-product.input'
import { Action, ProductAbility } from './product.ability'
import { TCurrentUser } from '@resources/auth/session.serializer'

@Resolver(Product)
export class ProductResolver {
  constructor(
    private productService: ProductService,
    private prisma: PrismaService,
    private ability: ProductAbility
  ) {}

  @ResolveField('owner')
  async owner(@Parent() product: Product) {
    return this.prisma.product.findUnique({ where: { id: product.id } }).owner()
  }

  @ResolveField('information')
  async information(@Parent() product: Product) {
    return this.prisma.product
      .findUnique({ where: { id: product.id } })
      .information()
  }

  @ResolveField('images')
  async images(@Parent() product: Product) {
    return this.prisma.product
      .findUnique({ where: { id: product.id } })
      .images()
  }

  @Query(() => [ProductStatus], { nullable: true })
  productStatuses() {
    return Object.values(ProductStatus)
  }

  @Query(() => [Product], { nullable: true })
  products(@CurrentUser() user: TCurrentUser) {
    const ability = this.ability.create(user)

    if (!ability.can(Action.READ, Product)) {
      throw new ForbiddenException('FORBIDDEN_ACCESS')
    }

    return this.productService.getAllProducts({
      where: {
        status: 'ACTIVE',
      },
    })
  }

  @Query(() => Product)
  product(@Args('id') id: number, @CurrentUser() user: TCurrentUser) {
    const ability = this.ability.create(user)

    if (ability.cannot(Action.READ, Product)) {
      throw new ForbiddenException('FORBIDDEN_ACCESS')
    }

    return this.productService.getProduct(id)
  }

  @UseGuards(IsAuthGuard)
  @Query(() => [Product])
  myProducts(@CurrentUser() user: TCurrentUser) {
    if (!user.companyMember?.companyId) {
      throw new ForbiddenException('FORBIDDEN_ACCESS')
    }

    return this.productService.getAllProducts({
      where: {
        companyId: user.companyMember?.companyId,
      },
      include: {
        images: {
          take: 1,
          include: {
            thumbnail: true,
          },
        },
      },
    })
  }

  @UseGuards(IsAuthGuard)
  @Mutation(() => Product)
  createProduct(
    @Args('data') data: CreateProductInput,
    @CurrentUser() user: TCurrentUser
  ) {
    const ability = this.ability.create(user)

    if (ability.cannot(Action.CREATE, Product)) {
      throw new ForbiddenException('FORBIDDEN_ACCESS')
    }

    return this.productService.createProduct(data, user)
  }

  @UseGuards(IsAuthGuard)
  @Mutation(() => Product)
  updateProduct(
    @Args('data') data: UpdateProductInput,
    @CurrentUser() user: TCurrentUser
  ) {
    const ability = this.ability.create(user)

    if (ability.cannot(Action.UPDATE, Product)) {
      throw new ForbiddenException('FORBIDDEN_ACCESS')
    }

    return this.productService.updateProduct(data)
  }

  @UseGuards(IsAuthGuard)
  @Mutation(() => Int)
  async deleteProduct(
    @Args('id') id: number,
    @CurrentUser() user: TCurrentUser
  ) {
    const ability = this.ability.create(user)

    if (ability.cannot(Action.DELETE, Product)) {
      throw new ForbiddenException('FORBIDDEN_ACCESS')
    }

    const product = await this.productService.deleteProduct(id)

    return product.id
  }
}
