import { Injectable } from '@nestjs/common'
import { send, sendMultiple, setApiKey, MailDataRequired } from '@sendgrid/mail'
import { ResponseError } from '@sendgrid/helpers/classes'
import { ClientResponse } from '@sendgrid/client/src/response'
import { ConfigService } from '@nestjs/config'
import deepmerge from 'deepmerge'
import Email from 'email-templates'
import path from 'path'
import { User } from '@prisma/client'

// import { MailConfig } from '@config/config.interface'

type TOptions = {
  defaultMailData?: Omit<MailDataRequired, 'html'>
}
@Injectable()
export class MailService {
  private options: TOptions

  constructor(private readonly configService: ConfigService) {
    // TODO: see how to config the MailConfig working with process.env
    // const mailConfig = this.configService.get<MailConfig>('mail')
    const apiKey = this.configService.get<string>('SENDGRID_API_KEY')

    this.options = {
      defaultMailData: {
        from: {
          name: this.configService.get<string>('DEFAULT_MAIL_FROM_NAME'),
          email: this.configService.get<string>('DEFAULT_MAIL_FROM'),
        },
        replyTo: this.configService.get<string>('DEFAULT_REPLY_TO'),
      },
    }

    if (!apiKey) {
      throw new Error('You forgot to set the SEND_API_KEY variable')
    }

    setApiKey(apiKey)
  }

  public async generate({
    templateName,
    info,
    data,
  }: {
    templateName: string
    info: Partial<MailDataRequired>
    data: Record<string, unknown>
  }) {
    const infoWithDefault = this.mergeWithDefaultMailData(info)
    const isDev = this.configService.get<string>('NODE_ENV') === 'development'

    const email = new Email({
      views: { root: './src/mails/templates/' },
      preview: isDev,
      message: {},
      send: false,
      juice: true,
      juiceResources: {
        preserveImportant: true,
        webResources: {
          relativeTo: path.resolve(`./src/mails/templates/${templateName}`),
        },
      },
    })

    const renderedEmail = await email.render(`${templateName}/html`, data)

    if (isDev) {
      const { to, subject } = info

      const formatAddress = (item) =>
        typeof item === 'object' && item !== null
          ? {
              name: item.name,
              address: item.email,
            }
          : item

      const formattedData = {
        to: Array.isArray(to)
          ? to.map((item) => formatAddress(item))
          : formatAddress(to),
        from: formatAddress(infoWithDefault.from),
      }

      return await email.send({
        message: {
          from: formattedData.from,
          to: formattedData.to,
          subject,
          html: renderedEmail,
        },
        template: `${templateName}/html`,
      })
    }

    return this.send({
      ...info,
      html: renderedEmail,
    })
  }

  public async send(
    data: Partial<MailDataRequired> | Partial<MailDataRequired>[],
    isMultiple?: boolean,
    cb?: (err: Error | ResponseError, result: [ClientResponse, unknown]) => void
  ): Promise<[ClientResponse, unknown]> {
    if (Array.isArray(data)) {
      return send(
        data.map((d) => this.mergeWithDefaultMailData(d)) as MailDataRequired[],
        isMultiple,
        cb
      )
    } else {
      return send(this.mergeWithDefaultMailData(data), isMultiple, cb)
    }
  }

  public async sendMultiple(
    data: Partial<MailDataRequired>,
    cb?: (
      error: Error | ResponseError,
      result: [ClientResponse, unknown]
    ) => void
  ): Promise<[ClientResponse, unknown]> {
    return sendMultiple(
      this.mergeWithDefaultMailData(data) as MailDataRequired,
      cb
    )
  }

  getSingleDestination(user: User) {
    return user.firstName
      ? {
          name: user.lastName
            ? `${user.firstName} ${user.lastName}`
            : user.firstName,
          email: user.email,
        }
      : user.email
  }

  get clientURL() {
    return process.env.NODE_ENV === 'development'
      ? this.configService.get<string>('DEV_CLIENT_URL')
      : this.configService.get<string>('PROD_CLIENT_URL')
  }

  private mergeWithDefaultMailData(
    data: Partial<MailDataRequired>
  ): MailDataRequired {
    if (!this.options.defaultMailData) {
      return data as MailDataRequired
    }
    return deepmerge(this.options.defaultMailData, data)
  }
}
