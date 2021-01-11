import { Field, ObjectType, ID } from '@nestjs/graphql'

@ObjectType({ isAbstract: true })
export abstract class BaseEntity<TId = string> {
  /*
   * Object ID defaults to string, but can receive an optional generic
   */
  @Field(() => ID)
  id: TId

  /*
   * Identifies the date and time when the object was created
   */
  createdAt: Date

  /*
   * Identifies the date and time when the object was last updated.
   */
  updatedAt: Date
}
