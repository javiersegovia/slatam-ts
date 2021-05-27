import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  getPost(postId: string) {
    return this.prisma.post.findUnique({
      where: { id: postId },
    })
  }

  getPublishedPosts() {
    return this.prisma.post.findMany({
      where: {
        published: true,
      },
    })
  }

  getAuthor(postId: string) {
    return this.prisma.post
      .findUnique({
        where: { id: postId },
      })
      .author()
  }
}
