import { Injectable, NotFoundException } from '@nestjs/common'
import { TCurrentUser } from '@resources/auth/session.serializer'
import { PrismaService } from '../prisma/prisma.service'
import { CreateProductInput } from './dto/create-product.input'
import { UpdateProductInput } from './dto/update-product.input'
import { Prisma } from '@prisma/client'
import { ProductImageService } from './product-image/product-image.service'

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private productImageService: ProductImageService
  ) {}

  getAllProducts(options?: Prisma.ProductFindManyArgs) {
    return this.prisma.product.findMany(options)
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

  async createProduct(data: CreateProductInput, user: TCurrentUser) {
    const { images, information, ...productData } = data
    const hasInfo = !!(information?.description || information?.category)

    // TODO: refactor product information

    const product = await this.prisma.product.create({
      data: {
        ...productData,
        information: hasInfo
          ? {
              create: {
                description: information.description,
                category: information.category
                  ? {
                      connect: {
                        id: information.category.id,
                      },
                    }
                  : undefined,
              },
            }
          : undefined,
        owner: {
          connect: {
            id: user.companyMember.companyId,
          },
        },
      },
    })

    if (images?.length) {
      await this.productImageService.createProductImages(images, product.id)
    }

    return product
  }

  async updateProduct(data: UpdateProductInput) {
    const {
      id: productId,
      newImages,
      existingImages,
      information,
      ...productData
    } = data

    const existingProductImages = await this.prisma.productImage.findMany({
      where: {
        productId,
      },
      select: {
        id: true,
      },
    })

    const productImagesToDelete = existingProductImages.filter(
      (pImage) => !existingImages.includes(pImage.id)
    )

    if (productImagesToDelete?.length) {
      await this.productImageService.deleteMultipleProductImages(
        productImagesToDelete
      )
    }

    if (newImages?.length) {
      await this.productImageService.createProductImages(newImages, productId)
    }

    const updatedProduct = await this.prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        ...productData,
        information: {
          update: {
            description: information.description || '',
            category: {
              connect: {
                id: information.category.id,
              },
            },
          },
        },
      },
    })

    return updatedProduct
  }

  async deleteProduct(productId: number) {
    const existingProductImages = await this.prisma.productImage.findMany({
      where: {
        productId,
      },
      select: {
        id: true,
      },
    })

    if (existingProductImages?.length) {
      await this.productImageService.deleteMultipleProductImages(
        existingProductImages
      )
    }

    await this.prisma.productInformation.deleteMany({
      where: {
        productId,
      },
    })

    return this.prisma.product.delete({
      where: {
        id: productId,
      },
    })
  }
}
