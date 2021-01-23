import { Module } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { OrderService } from './order.service'
import { OrderResolver } from './order.resolver'

@Module({
  providers: [PrismaService, OrderService, OrderResolver],
})
export class OrderModule {}
