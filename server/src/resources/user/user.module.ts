import { Module } from '@nestjs/common'
import { PrismaService } from '../prisma'
import { UserResolver, UserService } from '.'

@Module({
  providers: [UserResolver, PrismaService, UserService],
})
export class UserModule {}
