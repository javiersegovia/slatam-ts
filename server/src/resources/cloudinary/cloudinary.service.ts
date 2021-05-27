import { Injectable, Inject } from '@nestjs/common'
import { Cloudinary, CloudinaryV2 } from './cloudinary.provider'
import { UploadApiResponse } from 'cloudinary'
import { ReadStream } from 'fs'
import { Sharp } from 'sharp'

@Injectable()
export class CloudinaryService {
  constructor(@Inject(Cloudinary) private cloudinary: typeof CloudinaryV2) {}

  async upload(
    fileStream: ReadStream,
    transformer?: Sharp
  ): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const cloudStream = this.cloudinary.uploader.upload_stream(
        (err, fileUploaded) => {
          if (err) {
            reject(err)
          }

          resolve(fileUploaded)
        }
      )

      !!transformer
        ? fileStream.pipe(transformer).pipe(cloudStream)
        : fileStream.pipe(cloudStream)
    })
  }

  destroy(publicId: string) {
    return this.cloudinary.uploader.destroy(publicId)
  }

  destroyMultiple(publicIds: string[]) {
    return this.cloudinary.api.delete_resources(publicIds)
  }
}
