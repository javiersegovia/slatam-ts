import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql'
import { Country } from './country.entity'
import { CountryService } from './country.service'
import { PrismaService } from '@resources/prisma/prisma.service'

@Resolver(Country)
export class CountryResolver {
  constructor(
    private countryService: CountryService,
    private prisma: PrismaService
  ) {}

  @Query(() => Country)
  country(@Args('id') id: number) {
    return this.countryService.getCountry(id)
  }

  @Query(() => [Country], { nullable: true })
  countries() {
    return this.countryService.getAllCountries()
  }

  @Mutation(() => Int)
  async deleteCountry(@Args('id') id: number) {
    const country = await this.countryService.deleteCountry(id)
    return country.id
  }
}
