import { Resolver, ResolveField, Parent, Root } from '@nestjs/graphql'
import { Country } from '@resources/country/country.entity'
import { PrismaService } from '@resources/prisma/prisma.service'
import { UserInformation } from '@resources/user/user-information.entity'
import { Address } from './address.entity'

@Resolver(Address)
export class AddressResolver {
  constructor(private prisma: PrismaService) {}

  @ResolveField('owner', () => UserInformation, { nullable: true })
  async address(@Root() address: Address) {
    return this.prisma.address
      .findUnique({
        where: { id: address.id },
      })
      .owner()
  }

  @ResolveField('country', () => Country)
  async country(@Parent() address: Address) {
    return this.prisma.address
      .findUnique({
        where: {
          id: address.id,
        },
      })
      .country()
  }
}
