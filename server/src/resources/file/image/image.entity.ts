import { ObjectType } from '@nestjs/graphql'
import { File } from '../file.entity'

@ObjectType()
export class Image extends File {
  width: number
  height: number
}
