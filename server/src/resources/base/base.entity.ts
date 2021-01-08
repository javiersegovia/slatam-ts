import { Field, ObjectType, ID } from '@nestjs/graphql'

@ObjectType({ isAbstract: true })
export abstract class BaseEntity<TId = string> {
  @Field(() => ID)
  id: TId
  @Field({
    description: 'Identifies the date and time when the object was created.',
  })
  created_at: Date
  @Field({
    description:
      'Identifies the date and time when the object was last updated.',
  })
  updated_at: Date
}
