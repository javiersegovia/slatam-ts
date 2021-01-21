import { InputType } from '@nestjs/graphql'
import { Gender } from '../user-information.entity'
import { CreateOrUpdateAddressInput } from '@resources/location/address/dto/create-or-update-address.input'

@InputType()
export class UpdateUserInput {
  firstName?: string
  lastName?: string

  information?: UpdateUserInformationInput
}

@InputType()
export class UpdateUserInformationInput {
  address?: CreateOrUpdateAddressInput
  occupation?: string
  birthDate?: Date
  gender?: Gender
  nationality?: number[]
}
