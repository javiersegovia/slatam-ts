import { Module } from '@nestjs/common'
import { PostResolver } from '../post'
import { PrismaService } from '../prisma'
import { PostService } from '../post'

@Module({
  providers: [PostResolver, PostService, PrismaService],
})
export class PostModule {}
