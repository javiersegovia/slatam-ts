import { join } from 'path'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { PrismaService } from '@resources/prisma/prisma.service'
import { UserModule, PostModule } from '@resources/modules'
// import { UserModule } from '@resources/user/user.module'
// import { PostModule } from '@resources/post/post.module'

console.log(UserModule, PostModule)

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), '../generated/schema.gql'),
    }),
    UserModule,
    PostModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
