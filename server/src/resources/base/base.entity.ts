import { Field, ObjectType, ID, Int } from '@nestjs/graphql'

@ObjectType({ isAbstract: true })
abstract class Base {
  /*
   * Identifies the date and time when the object was created
   */
  createdAt: Date

  /*
   * Identifies the date and time when the object was last updated.
   */
  updatedAt: Date
}
@ObjectType({ isAbstract: true })
export abstract class BaseEntity extends Base {
  @Field(() => ID)
  id: string
}

/*
 * Used for entities with ID as a number
 */
@ObjectType({ isAbstract: true })
export abstract class BaseEntityInt extends Base {
  @Field(() => Int)
  id: number
}
