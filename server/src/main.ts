import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

import session from 'express-session'
import passport from 'passport'
import connectRedis from 'connect-redis'
import redis from 'redis'

const RedisStore = connectRedis(session)
const redisClient = redis.createClient()

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe())

  const clientURL =
    process.env.NODE_ENV === 'development'
      ? process.env.DEV_CLIENT_URL
      : process.env.PROD_CLIENT_URL

  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
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

  if (process.env.GENERATE) {
    console.log('Generated new schema.graphql file. Exiting...')
    process.exit()
  }
}

bootstrap()
