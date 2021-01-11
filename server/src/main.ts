import { NestFactory } from '@nestjs/core'
import cookieParser from 'cookie-parser'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.use(cookieParser())

  // for querying from frontEnd
  // app.enableCors({
  //   credentials: true,
  //   origin: true,
  // })

  await app.listen(process.env.PORT || 4000)
}

bootstrap()
