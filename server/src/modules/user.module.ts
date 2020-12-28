import { Module } from '@nestjs/common'
import { UserResolver } from '@resolvers/user.resolver'
import { PrismaService } from '@services/prisma.service'
import { UserService } from '@services/user.service'

@Module({
  providers: [UserResolver, PrismaService, UserService],
})
export class UserModule {}
