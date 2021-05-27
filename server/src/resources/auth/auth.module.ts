import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { PrismaService } from '../prisma/prisma.service'
import { PasswordService } from './password.service'

import { IsAuthGuard } from '@guards/is-auth.guard'

import { AuthService } from './auth.service'
import { AuthResolver } from './auth.resolver'

import { MailModule } from '@mails/mail.module'
import { ErrorService } from '@resources/error/error.service'

import { LocalStrategy } from './local.strategy'
import { SessionSerializer } from './session.serializer'

/**
 * Session based authentication
 */
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'local', session: true }),
    MailModule,
  ],
  providers: [
    AuthService,
    AuthResolver,
    LocalStrategy,
    SessionSerializer,
    IsAuthGuard,
    PasswordService,
    PrismaService,
    ErrorService,
  ],
  exports: [IsAuthGuard],
})
export class AuthModule {}
