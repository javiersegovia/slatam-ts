import { join } from 'path'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { PrismaService } from '@resources/prisma'
import { UserModule, PostModule } from '@resources/modules'

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'generated/schema.gql'),
    }),
    UserModule,
    PostModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
