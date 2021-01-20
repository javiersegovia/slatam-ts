import { ObjectType } from '@nestjs/graphql'
import { BaseEntity } from '../base/base.entity'

@ObjectType()
export class Country extends BaseEntity<number> {
  name: string
  flag: string
  code2: string
}
