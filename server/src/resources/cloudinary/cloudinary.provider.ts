import { Provider } from '@nestjs/common'
import * as CloudinaryLib from 'cloudinary'

export const Cloudinary = 'lib:cloudinary'
export const CloudinaryV2 = CloudinaryLib.v2

export const cloudinaryProvider: Provider = {
  provide: Cloudinary,
  useValue: CloudinaryV2,
}
