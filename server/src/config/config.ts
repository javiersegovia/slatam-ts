import { join } from 'path'
import { Config } from './config.interface'

const config: Config = {
  nest: {
    port: parseInt(process.env.PORT, 10) || 4000,
  },
  cors: {
    enabled: true,
  },
  graphql: {
    playgroundEnabled: true,
    debug: true,
    schemaDestination: join(process.cwd(), '../generated/schema.graphql'),
    sortSchema: true,
  },
  security: {
    verifyEmailTokenExpiresIn: '1h',
    bcryptSaltOrRound: 10,
  },
  images: {
    product: {
      large: {
        width: 800,
        height: 600,
      },
      thumbnail: {
        width: 380,
        height: 220,
      },
      small: {
        width: 95,
        height: 55,
      },
    },
  },
  mail: {
    apiKey: process.env.SENDGRID_API_KEY,
    defaultMailData: {
      from: {
        name: process.env.DEFAULT_MAIL_FROM_NAME,
        email: process.env.DEFAULT_MAIL_FROM,
      },
      replyTo: process.env.DEFAULT_REPLY_TO,
      html: '',
    },
  },
}

export const getConfig = (): Config => config
