import { ObjectType } from '@nestjs/graphql'
import { BaseEntityInt } from '../base/base.entity'

@ObjectType()
export class Country extends BaseEntityInt {
  name: string
  flag: string
  code2: string
}
