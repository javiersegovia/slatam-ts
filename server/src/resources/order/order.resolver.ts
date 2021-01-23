import { Resolver, Args, Mutation } from '@nestjs/graphql'
import { Order } from './order.entity'
import { OrderService } from './order.service'
import { PrismaService } from '@resources/prisma/prisma.service'
import { CreateOrderInput } from './dto/create-order.input'
import { IsAuthGuard } from '@guards/is-auth.guard'
import { UseGuards } from '@nestjs/common'
import { CurrentUser } from '@decorators/current-user.decorator'
import { User } from '@resources/user/user.entity'

@Resolver(Order)
export class OrderResolver {
  constructor(
    private orderService: OrderService,
    private prisma: PrismaService
  ) {}

  @UseGuards(IsAuthGuard)
  @Mutation(() => Order)
  createOrder(@Args('data') data: CreateOrderInput, @CurrentUser() user: User) {
    //   const ability = this.ability.create(user)
    //   if (!ability.can(Action.CREATE, Company)) {
    //     throw new ForbiddenException('FORBIDDEN_ACCESS')
    //   }
    return this.orderService.createOrder(data, user)
  }
}
