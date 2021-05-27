import { Resolver, ResolveField, Parent, Root } from '@nestjs/graphql'
import { User } from './user.entity'
import { PrismaService } from '../prisma/prisma.service'
import { UserInformation } from './user-information.entity'
import { Address } from '@resources/location/address/address.entity'
import { Country } from '@resources/country/country.entity'

@Resolver(UserInformation)
export class UserInformationResolver {
  constructor(private prisma: PrismaService) {}

  @ResolveField('user', () => User)
  user(@Root() userInfo: UserInformation) {
    return this.prisma.userInformation
      .findUnique({
        where: { id: userInfo.id },
      })
      .user()
  }

  @ResolveField('address', () => Address, { nullable: true })
  address(@Parent() userInfo: UserInformation) {
    return this.prisma.address.findFirst({
      where: {
        ownerId: userInfo.id,
      },
    })
  }

  @ResolveField('nationality', () => [Country], { nullable: true })
  nationality(@Parent() userInfo: UserInformation) {
    return this.prisma.userInformation
      .findUnique({
        where: { id: userInfo.id },
      })
      .nationality()
  }
}
