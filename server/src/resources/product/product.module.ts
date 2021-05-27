import { Module } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { ProductService } from './product.service'
import { ProductResolver } from './product.resolver'
import { ProductAbility } from './product.ability'
import { FileModule } from '@resources/file/file.module'
import { ProductImageResolver } from './product-image/product-image.resolver'
import { ProductImageService } from './product-image/product-image.service'
import { ProductInformationResolver } from './product-information/product-information.resolver'

@Module({
  providers: [
    PrismaService,
    ProductService,
    ProductResolver,
    ProductImageResolver,
    ProductInformationResolver,
    ProductImageService,
    ProductAbility,
  ],
  imports: [FileModule],
  exports: [ProductAbility],
})
export class ProductModule {}
