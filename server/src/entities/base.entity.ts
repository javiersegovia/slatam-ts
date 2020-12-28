import { Field, ObjectType, ID } from '@nestjs/graphql'

@ObjectType({ isAbstract: true })
export abstract class BaseEntity {
  @Field(() => ID)
  id: string
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
