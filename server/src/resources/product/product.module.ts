import { Module } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { ProductService } from './product.service'
import { ProductResolver } from './product.resolver'
import { ProductAbility } from './product.ability'

@Module({
  providers: [PrismaService, ProductService, ProductResolver, ProductAbility],
  exports: [ProductAbility],
})
export class ProductModule {}
