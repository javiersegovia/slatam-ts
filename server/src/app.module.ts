import { join } from 'path'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getConfig } from '@config/config'
import { GraphqlConfig } from '@config/config.interface'
import { GraphQLModule } from '@nestjs/graphql'
import { PrismaService } from '@resources/prisma/prisma.service'
import { UserModule, PostModule, AuthModule } from '@resources/modules'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [getConfig] }),
    GraphQLModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const graphqlConfig = configService.get<GraphqlConfig>('graphql')
        return {
          buildSchemaOptions: {
            numberScalarMode: 'integer',
          },
          sortSchema: graphqlConfig.sortSchema,
          autoSchemaFile:
            graphqlConfig.schemaDestination ||
            join(process.cwd(), '../generated/schema.gql'),
          debug: graphqlConfig.debug,
          playground: graphqlConfig.playgroundEnabled,
          context: ({ req }) => ({ req }),
        }
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    PostModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
