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
    tokenExpiresIn: '10m',
    tokenRefreshIn: '3d',
    bcryptSaltOrRound: 10,
  },
  mail: {
    apiKey: process.env.SENDGRID_API_KEY,
    defaultMailData: {
      from: process.env.DEFAULT_MAIL_FROM,
      replyTo: process.env.DEFAULT_REPLY_TO,
      html: '',
    },
  },
}

export const getConfig = (): Config => config
