import { ObjectType, registerEnumType } from '@nestjs/graphql'
import { BaseEntity } from '@resources/base/base.entity'
import { Country } from '@resources/country/country.entity'
import { Address } from '@resources/location/address/address.entity'
import { User } from './user.entity'

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  NON_BINARY = 'NON_BINARY',
}

registerEnumType(Gender, {
  name: 'Gender',
  description: 'User gender',
})

@ObjectType()
export class UserInformation extends BaseEntity<string> {
  user: User
  address?: Address
  occupation?: string
  gender?: Gender
  birthDate?: Date
  nationality?: Country[]
}
