import { Injectable } from '@nestjs/common'
import { PrismaService } from '@resources/prisma/prisma.service'
import { FileUpload } from 'graphql-upload'
import sharp from 'sharp'
import { ImageService } from '@resources/file/image/image.service'
import { ImagesConfig } from '@config/config.interface'
import { ConfigService } from '@nestjs/config'
import { ProductImage } from './product-image.entity'

@Injectable()
export class ProductImageService {
  private productImageSizes: ImagesConfig['product']

  constructor(
    private imageService: ImageService,
    private prisma: PrismaService,
    private readonly configService: ConfigService
  ) {
    this.productImageSizes = this.configService.get<ImagesConfig>('images')[
      'product'
    ]
  }

  async createProductImages(images: FileUpload[], productId: number) {
    const generatedImages = await this.imageService.createMultipleImagesFromTransformers(
      this.productImagesWithTransformers(images)
    )

    const { large, small, thumbnail } = this.productImageSizes

    const promises = generatedImages.map((images) => {
      const largeImage = images.find(
        (img) => img.width === large.width && img.height === large.height
      )

      const thumbnailImage = images.find(
        (img) =>
          img.width === thumbnail.width && img.height === thumbnail.height
      )

      const smallImage = images.find(
        (img) => img.width === small.width && img.height === small.height
      )

      return this.prisma.productImage.create({
        data: {
          largeId: largeImage.id,
          thumbnailId: thumbnailImage.id,
          smallId: smallImage.id,
          productId,
        },
      })
    })

    return Promise.all(promises)
  }

  async deleteMultipleProductImages(productImages: Pick<ProductImage, 'id'>[]) {
    const productImageIds = productImages.map((pImage) => pImage.id)

    const imagesToDelete = await this.prisma.image.findMany({
      where: {
        OR: [
          {
            productLargeImage: {
              id: {
                in: productImageIds,
              },
            },
          },
          {
            productSmallImage: {
              id: {
                in: productImageIds,
              },
            },
          },
          {
            productThumbnailImage: {
              id: {
                in: productImageIds,
              },
            },
          },
        ],
      },
    })

    const deletedProductImages = await this.prisma.productImage.deleteMany({
      where: {
        id: {
          in: productImageIds,
        },
      },
    })

    if (imagesToDelete?.length) {
      await this.imageService.deleteImages(imagesToDelete)
    }

    return deletedProductImages
  }

  productImagesWithTransformers(images: FileUpload[]) {
    return images.map((image) => {
      const transform = sharp({ failOnError: false })

      const transformers = Object.keys(this.productImageSizes).map((key) => {
        const size = this.productImageSizes[key]
        return transform.clone().resize(size.width, size.height).webp()
      })

      return {
        image,
        transformers,
      }
    })
  }
}
