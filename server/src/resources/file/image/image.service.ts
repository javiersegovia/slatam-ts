import { Injectable } from '@nestjs/common'
import { PrismaService } from '@resources/prisma/prisma.service'
import { ReadStream } from 'fs'
import { FileUpload } from 'graphql-upload'
import sharp, { Sharp } from 'sharp'
import { FileService } from '../file.service'
import Promise from 'bluebird'
import { Image } from './image.entity'

@Injectable()
export class ImageService {
  constructor(
    private fileService: FileService,
    private prisma: PrismaService
  ) {}

  async createImage(fileStream: ReadStream, transformer?: Sharp) {
    const uploadedFile = await this.fileService.upload(fileStream, transformer)

    const {
      secure_url: url,
      format,
      width,
      height,
      public_id: publicId,
    } = uploadedFile

    return this.prisma.image.create({
      data: {
        url,
        width,
        height,
        format,
        publicId,
      },
    })
  }

  async createMultipleImagesFromTransformers(
    imagesData: {
      image: FileUpload
      transformers: sharp.Sharp[]
    }[]
  ) {
    const result = await Promise.all(
      imagesData.map((imageData) => {
        return Promise.all(
          imageData.transformers.map(async (transformer) => {
            const { createReadStream } = await imageData.image
            const fileStream = createReadStream()
            return this.createImage(fileStream, transformer)
          })
        )
      })
    )

    return result
  }

  async deleteImage(image: Image) {
    await this.fileService.destroy(image.publicId)

    return this.prisma.image.delete({
      where: {
        id: image.id,
      },
    })
  }

  async deleteImages(images: Image[]) {
    const imageIds = images.map((image) => image.id)
    const publicIds = images.map((image) => image.publicId)

    if (publicIds?.length) {
      await this.fileService.destroyMultiple(publicIds)
    }

    const deletionsFromDB = await this.prisma.image.deleteMany({
      where: {
        id: {
          in: imageIds,
        },
      },
    })

    return deletionsFromDB
  }
}
