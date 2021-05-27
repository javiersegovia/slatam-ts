import { Module } from '@nestjs/common'
import { CloudinaryModule } from '@resources/cloudinary/cloudinary.module'
import { PrismaService } from '../prisma/prisma.service'
import { FileService } from './file.service'
import { ImageService } from './image/image.service'

@Module({
  imports: [CloudinaryModule],
  providers: [PrismaService, FileService, ImageService],
  exports: [FileService, ImageService],
})
export class FileModule {}
