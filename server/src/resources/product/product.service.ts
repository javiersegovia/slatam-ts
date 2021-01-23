import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateProductInput } from './dto/create-product.input'
import { UpdateProductInput } from './dto/update-product.input'

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  getAllProducts() {
    return this.prisma.product.findMany()
  }

  async getProduct(productId: number) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    })

    if (!product) {
      throw new NotFoundException('NOT_FOUND')
    }

    return product
  }

  async createProduct(data: CreateProductInput, user: any) {
    return this.prisma.product.create({
      data: {
        ...data,
        owner: {
          connect: {
            id: user.companyMember.companyId,
          },
        },
      },
    })
  }

  updateProduct(data: UpdateProductInput) {
    const { id, ...productData } = data

    return this.prisma.product.update({
      where: {
        id,
      },
      data: {
        ...productData,
      },
    })
  }

  deleteProduct(productId: number, user: any) {
    return this.prisma.company.update({
      where: {
        id: user.companyMember.companyId,
      },
      data: {
        products: {
          delete: [{ id: productId }],
        },
      },
    })
  }
}
