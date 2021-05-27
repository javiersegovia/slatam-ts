import { Field, InputType } from '@nestjs/graphql'
import { Gender } from '../user-information.entity'
import { CreateOrUpdateAddressInput } from '@resources/location/address/dto/create-or-update-address.input'
import { CountryInput } from '../../country/dto/country.input'
import { Exclude } from 'class-transformer'
import { FileUpload } from 'graphql-upload'
import { Upload } from '@lib/scalars'

@InputType()
export class UpdateUserInput {
  firstName?: string
  lastName?: string

  @Exclude()
  @Field(() => Upload)
  avatar?: FileUpload

  information?: UpdateUserInformationInput
}

@InputType()
export class UpdateUserInformationInput {
  address?: CreateOrUpdateAddressInput
  occupation?: string
  birthDate?: Date
  gender?: Gender
  nationality?: CountryInput[]
}
