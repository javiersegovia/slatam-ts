import { IsNotEmpty, MinLength } from 'class-validator'
import { InputType } from '@nestjs/graphql'

@InputType()
export class CreateOrUpdateAddressInput {
  @MinLength(8)
  description?: string

  @IsNotEmpty()
  countryId: number
}
