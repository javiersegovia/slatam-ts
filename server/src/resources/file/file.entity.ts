import { ObjectType } from '@nestjs/graphql'
import { BaseEntity } from '@resources/base/base.entity'

@ObjectType()
export class File extends BaseEntity {
  publicId: string
  url: string
  format: string
}
