import { Module } from '@nestjs/common'
import { PostResolver } from '@resolvers/post.resolver'
import { PrismaService } from '@services/prisma.service'
import { PostService } from '@services/post.service'

@Module({
  providers: [PostResolver, PostService, PrismaService],
})
export class PostModule {}
