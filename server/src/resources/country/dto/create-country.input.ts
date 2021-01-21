import { InputType } from '@nestjs/graphql'

@InputType()
export class CreateCountryInput {
  code2: string
  name: string
  flag: string
}
