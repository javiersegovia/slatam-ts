import { ObjectType } from '@nestjs/graphql'
import { BaseEntity } from '../base/base.entity'

@ObjectType()
export class Category extends BaseEntity<number> {
  name: string
}
