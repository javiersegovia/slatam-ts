import { Module } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { OrderService } from './order.service'
import { OrderResolver } from './order.resolver'
import { OrderAbility } from './order.ability'

@Module({
  providers: [PrismaService, OrderService, OrderResolver, OrderAbility],
  exports: [OrderAbility],
})
export class OrderModule {}
