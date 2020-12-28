import { Module } from '@nestjs/common'
import { UserResolver } from '../resolvers/user.resolver'
import { PrismaService } from '../services/prisma.service'
// import { UserService } from '../services/user.service'
// import { PasswordService } from '../../services/password.service'

@Module({
  providers: [UserResolver, PrismaService],
})
export class UserModule {}
