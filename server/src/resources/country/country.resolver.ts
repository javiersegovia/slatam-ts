import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { Country } from './country.entity'
import { CountryService } from './country.service'
import { CountryInput } from './dto/country.input'

@Resolver(Country)
export class CountryResolver {
  constructor(private countryService: CountryService) {}

  @Query(() => Country)
  getCountry(@Args('id') id: number) {
    return this.countryService.getCountry(id)
  }

  @Query(() => [Country], { nullable: true })
  getAllCountries() {
    return this.countryService.getAllCountries()
  }

  @Mutation((_returns) => Country)
  updateCountry(@Args('id') id: number, @Args('data') data: CountryInput) {
    return this.countryService.updateCountry(id, data)
  }
}
