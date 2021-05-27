import { Module } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { UserService } from './user.service'
import { UserResolver } from './user.resolver'
import { UserInformationResolver } from './user-information.resolver'
import { FileModule } from '@resources/file/file.module'

@Module({
  imports: [FileModule],
  providers: [
    PrismaService,
    UserService,
    UserResolver,
    UserInformationResolver,
  ],
})
export class UserModule {}
