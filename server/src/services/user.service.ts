import { Injectable } from '@nestjs/common'
import { PrismaService } from './prisma.service'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  getUser(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
    })
  }

  getAllUsers() {
    return this.prisma.user.findMany()
  }

  getUserPosts(userId: string) {
    return this.prisma.user
      .findUnique({
        where: {
          id: userId,
        },
      })
      .posts()
  }
}
