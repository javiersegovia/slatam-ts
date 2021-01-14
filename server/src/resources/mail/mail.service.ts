import { Injectable } from '@nestjs/common'
import { send, sendMultiple, setApiKey, MailDataRequired } from '@sendgrid/mail'
import { ResponseError } from '@sendgrid/helpers/classes'
import { ClientResponse } from '@sendgrid/client/src/response'
import { ConfigService } from '@nestjs/config'
import { MailConfig } from '@config/config.interface'
import deepmerge from 'deepmerge'

@Injectable()
export class MailService {
  private options: MailConfig

  constructor(private readonly configService: ConfigService) {
    // TODO: see how to config the MailConfig with process.env
    const mailConfig = this.configService.get<MailConfig>('mail')
    const apiKey = this.configService.get<string>('SENDGRID_API_KEY')

    this.options = mailConfig

    if (!apiKey) {
      throw new Error('You forgot to set the SEND_API_KEY variable')
    }

    setApiKey(apiKey)
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

  private mergeWithDefaultMailData(
    data: Partial<MailDataRequired>
  ): MailDataRequired {
    if (!this.options.defaultMailData) {
      return data as MailDataRequired
    }
    return deepmerge(this.options.defaultMailData, data)
  }
}
