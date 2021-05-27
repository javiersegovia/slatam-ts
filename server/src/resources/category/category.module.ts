import { Module } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CategoryService } from './category.service'
import { CategoryResolver } from './category.resolver'

@Module({
  providers: [PrismaService, CategoryService, CategoryResolver],
})
export class CategoryModule {}
