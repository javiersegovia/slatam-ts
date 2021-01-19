import { join } from 'path'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getConfig } from '@config/config'
import { GraphqlConfig } from '@config/config.interface'
import { GraphQLModule } from '@nestjs/graphql'
import { PrismaService } from '@resources/prisma/prisma.service'
import {
  UserModule,
  PostModule,
  AuthModule,
  ErrorModule,
  CompanyModule,
  ProductModule,
  MailModule,
} from '@resources/modules'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [getConfig],
      envFilePath: join(process.cwd(), '.env'),
    }),
    GraphQLModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const graphqlConfig = configService.get<GraphqlConfig>('graphql')

        // TODO: set this clientURL in a securityConfig variable
        const clientURL =
          process.env.NODE_ENV === 'development'
            ? process.env.DEV_CLIENT_URL
            : process.env.PROD_CLIENT_URL
        return {
          buildSchemaOptions: {
            numberScalarMode: 'integer',
          },
          sortSchema: graphqlConfig.sortSchema,
          autoSchemaFile:
            graphqlConfig.schemaDestination ||
            join(process.cwd(), '../generated/schema.graphql'),
          debug: graphqlConfig.debug,
          playground: graphqlConfig.playgroundEnabled,
          context: ({ req, res }) => ({ req, res }),
          cors: {
            credentials: true,
            origin: clientURL,
          },
        }
      },
      inject: [ConfigService],
    }),
    AuthModule,
    MailModule,
    ErrorModule,
    UserModule,
    PostModule,
    CompanyModule,
    ProductModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
