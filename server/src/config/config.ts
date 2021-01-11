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
    schemaDestination: join(process.cwd(), '../generated/schema.gql'),
    sortSchema: true,
  },
  security: {
    tokenExpiresIn: '15s',
    tokenRefreshIn: '1h',
    bcryptSaltOrRound: 10,
  },
}

export const getConfig = (): Config => config
