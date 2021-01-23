import {
  Resolver,
  Query,
  Parent,
  ResolveField,
  Args,
  Mutation,
} from '@nestjs/graphql'
import { PrismaService } from '@resources/prisma/prisma.service'
import { Product } from './product.entity'
import { User } from '@resources/user/user.entity'
import { ProductService } from './product.service'
import { CurrentUser } from '@decorators/current-user.decorator'
import { IsAuthGuard } from '@guards/is-auth.guard'
import { UseGuards } from '@nestjs/common'
import { ForbiddenException } from '@nestjs/common'
import { CreateProductInput } from './dto/create-product.input'
import { UpdateProductInput } from './dto/update-product.input'
import { Action, ProductAbility } from './product.ability'

@Resolver(Product)
export class ProductResolver {
  constructor(
    private productService: ProductService,
    private prisma: PrismaService,
    private ability: ProductAbility
  ) {}

  @Query(() => [Product], { nullable: true })
  getAllProducts() {
    return this.productService.getAllProducts()
  }

  @ResolveField('owner')
  async owner(@Parent() product: Product) {
    return this.prisma.product.findUnique({ where: { id: product.id } }).owner()
  }

  @Query(() => Product)
  async getProduct(@Args('id') id: number, @CurrentUser() user: User) {
    const ability = this.ability.create(user)
    if (ability.can(Action.READ, Product)) {
      return this.productService.getProduct(id)
    } else {
      throw new ForbiddenException('FORBIDDEN_ACCESS')
    }
  }

  @UseGuards(IsAuthGuard)
  @Mutation(() => Product)
  createProduct(
    @Args('data') data: CreateProductInput,
    @CurrentUser() user: User
  ) {
    const ability = this.ability.create(user)
    if (ability.can(Action.CREATE, Product)) {
      return this.productService.createProduct(data, user)
    } else {
      throw new ForbiddenException('FORBIDDEN_ACCESS')
    }
  }

  @UseGuards(IsAuthGuard)
  @Mutation(() => Product)
  updateProduct(
    @Args('data') data: UpdateProductInput,
    @CurrentUser() user: User
  ) {
    const ability = this.ability.create(user)
    if (ability.can(Action.UPDATE, Product)) {
      return this.productService.updateProduct(data)
    } else {
      throw new ForbiddenException('FORBIDDEN_ACCESS')
    }
  }

  @UseGuards(IsAuthGuard)
  @Mutation(() => Boolean)
  async deleteProduct(@Args('id') id: number, @CurrentUser() user: User) {
    const ability = this.ability.create(user)
    if (ability.can(Action.DELETE, Product)) {
      await this.productService.deleteProduct(id, user)
      return true
    } else {
      throw new ForbiddenException('FORBIDDEN_ACCESS')
    }
  }
}
