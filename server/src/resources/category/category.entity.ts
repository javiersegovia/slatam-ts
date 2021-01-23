import { ObjectType } from '@nestjs/graphql'
import { BaseEntityInt } from '../base/base.entity'

@ObjectType()
export class Category extends BaseEntityInt {
  name: string
}
