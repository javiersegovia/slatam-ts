import { MailDataRequired } from '@sendgrid/mail'

export interface Config {
  nest: NestConfig
  cors: CorsConfig
  graphql: GraphqlConfig
  security: SecurityConfig
  mail: MailConfig
  images: ImagesConfig
}

export interface NestConfig {
  port: number
}

export interface CorsConfig {
  enabled: boolean
}

export interface GraphqlConfig {
  playgroundEnabled: boolean
  debug: boolean
  schemaDestination: string
  sortSchema: boolean
}

export interface SecurityConfig {
  verifyEmailTokenExpiresIn: string
  bcryptSaltOrRound: string | number
}

export interface MailConfig {
  apiKey: string
  defaultMailData?: MailDataRequired
  substitutionWrappers?: { left: string; right: string }
}

export interface ImagesConfig {
  product: {
    large: IImage
    thumbnail: IImage
    small: IImage
  }
}

interface IImage {
  width: number
  height: number
}
