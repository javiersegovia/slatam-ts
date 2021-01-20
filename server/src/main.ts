import { NestFactory } from '@nestjs/core'
// import cookieParser from 'cookie-parser' // TODO: remove this library
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

import session from 'express-session'
import passport from 'passport'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe())

  const clientURL =
    process.env.NODE_ENV === 'development'
      ? process.env.DEV_CLIENT_URL
      : process.env.PROD_CLIENT_URL

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 5, // 5H
      },
    })
  )

  app.use(passport.initialize())
  app.use(passport.session())

  app.enableCors({
    credentials: true,
    origin: clientURL,
  })

  await app.listen(process.env.PORT || 4000)
}

bootstrap()
