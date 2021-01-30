import {
  Resolver,
  Args,
  Mutation,
  Query,
  Parent,
  ResolveField,
} from '@nestjs/graphql'
import { Order } from './order.entity'
import { OrderService } from './order.service'
import { PrismaService } from '@resources/prisma/prisma.service'
import { CreateOrderInput } from './dto/create-order.input'
import { IsAuthGuard } from '@guards/is-auth.guard'
import { UseGuards } from '@nestjs/common'
import { CurrentUser } from '@decorators/current-user.decorator'
import { User } from '@resources/user/user.entity'
import { UpdateOrderInput } from './dto/update-order.input'
import { Action, OrderAbility } from './order.ability'
import { ForbiddenException } from '@nestjs/common'

@Resolver(Order)
export class OrderResolver {
  constructor(
    private orderService: OrderService,
    private prisma: PrismaService,
    private ability: OrderAbility
  ) {}

  @UseGuards(IsAuthGuard)
  @Query(() => [Order], { nullable: true })
  getAllOrders(@CurrentUser() user: User) {
    const ability = this.ability.create(user)
    if (!ability.can(Action.READ, Order)) {
      throw new ForbiddenException('FORBIDDEN_ACCESS')
    }
    return this.orderService.getAllOrders()
  }

  @UseGuards(IsAuthGuard)
  @Query(() => Order, { nullable: true })
  getOrder(@Args('id') id: number, @CurrentUser() user: User) {
    const ability = this.ability.create(user)
    if (!ability.can(Action.READ, Order)) {
      throw new ForbiddenException('FORBIDDEN_ACCESS')
    }
    return this.orderService.getOrder(id)
  }

  @ResolveField('buyer')
  async buyer(@Parent() order: Order) {
    return this.prisma.order.findUnique({ where: { id: order.id } }).buyer()
  }

  @ResolveField('seller')
  async seller(@Parent() order: Order) {
    return this.prisma.order.findUnique({ where: { id: order.id } }).seller()
  }

  @ResolveField('products')
  async products(@Parent() order: Order) {
    return this.prisma.order.findUnique({ where: { id: order.id } }).products()
  }

  @UseGuards(IsAuthGuard)
  @Mutation(() => Order)
  createOrder(@Args('data') data: CreateOrderInput, @CurrentUser() user: User) {
    const ability = this.ability.create(user)
    if (!ability.can(Action.CREATE, Order)) {
      throw new ForbiddenException('FORBIDDEN_ACCESS')
    }
    return this.orderService.createOrder(data)
  }

  @UseGuards(IsAuthGuard)
  @Mutation(() => Order)
  updateOrder(@Args('data') data: UpdateOrderInput, @CurrentUser() user: User) {
    const ability = this.ability.create(user)
    if (!ability.can(Action.UPDATE, Order)) {
      throw new ForbiddenException('FORBIDDEN_ACCESS')
    }
    return this.orderService.updateOrder(data)
  }

  @UseGuards(IsAuthGuard)
  @Mutation(() => Boolean)
  deleteOrder(@Args('id') id: number, @CurrentUser() user: User) {
    const ability = this.ability.create(user)
    if (!ability.can(Action.DELETE, Order)) {
      throw new ForbiddenException('FORBIDDEN_ACCESS')
    }
    this.orderService.deleteOrder(id)
    return true
  }
}
