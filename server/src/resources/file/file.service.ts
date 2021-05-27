import { Injectable } from '@nestjs/common'
import { ReadStream } from 'fs'
import { Sharp } from 'sharp'
import { CloudinaryService } from '../cloudinary/cloudinary.service'

@Injectable()
export class FileService {
  constructor(private cloudinaryService: CloudinaryService) {}

  async upload(fileStream: ReadStream, transformer?: Sharp) {
    const result = await this.cloudinaryService.upload(fileStream, transformer)
    fileStream.destroy()
    return result
  }

  destroy(publicId: string) {
    return this.cloudinaryService.destroy(publicId)
  }

  destroyMultiple(publicIds: string[]) {
    return this.cloudinaryService.destroyMultiple(publicIds)
  }
}
