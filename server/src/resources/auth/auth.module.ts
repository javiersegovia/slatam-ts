import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { PrismaService } from '../prisma/prisma.service'
import { PasswordService } from './password.service'
import { IsAuthenticatedGuard } from '@guards/is-authenticated.guard'
import { AuthService } from './auth.service'
import { AuthResolver } from './auth.resolver'
import { JwtStrategy } from './jwt.strategy'
import { SecurityConfig } from '@config/config.interface'
import { MailModule } from '@mails/mail.module'

// TODO: add authentication Guard

/**
 * 1. When user registers or logs in, the server generates an accessToken and a refreshToken.
 *
 * 2. The accessToken is sent in the response, so the user can store it and
 * send in his next request as a Bearer token inside his Authorization header.
 * The refreshToken is stored in a httpOnly cookie, so is not visible in the client.
 *
 * 3. The accessToken will have a short expiration time. After it expires, the server will send
 * a TokenExpiredError when the user tries to access a protected resolver method (protected by a AuthGuard)
 *
 * 4. When the client receives the "TokenExpiredError", it should hit the "refreshAccessToken"
 * method in the AuthResolver.
 *
 * 5. If the user has a valid RefreshToken in his cookies, will get back a new AccessToken,
 * and then he can retry to access the protected resolver method.
 *
 * 6. If the user has a invalid or expired RefreshToken, he will get back an UnauthorizedException,
 * and then he should be redirected to the login page in the client side.
 */

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const securityConfig = configService.get<SecurityConfig>('security')
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: securityConfig.accessTokenExpiresIn,
          },
        }
      },
      inject: [ConfigService],
    }),
    MailModule,
  ],
  providers: [
    AuthService,
    AuthResolver,
    JwtStrategy,
    IsAuthenticatedGuard,
    PasswordService,
    PrismaService,
  ],
  exports: [IsAuthenticatedGuard],
})
export class AuthModule {}
