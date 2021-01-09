import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { PrismaService } from '../prisma/prisma.service'
import { PasswordService } from './password.service'
// import { GqlAuthGuard } from '../../guards/gql-auth.guard';
import { AuthService } from './auth.service'
import { AuthResolver } from './auth.resolver'
import { JwtStrategy } from './jwt.strategy'
import { SecurityConfig } from '@config/config.interface'

// TODO: add authentication Guard

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const securityConfig = configService.get<SecurityConfig>('security')
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: securityConfig.tokenExpiresIn,
          },
        }
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    AuthResolver,
    JwtStrategy,
    // GqlAuthGuard,
    PasswordService,
    PrismaService,
  ],
  // exports: [GqlAuthGuard],
})
export class AuthModule {}
