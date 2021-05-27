import { InputType } from '@nestjs/graphql'

@InputType()
export class CategoryInput {
  id: number
}
