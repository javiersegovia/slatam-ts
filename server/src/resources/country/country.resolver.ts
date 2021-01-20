import { Resolver, Query, Args } from '@nestjs/graphql'
import { Country } from './country.entity'
import { CountryService } from './country.service'

@Resolver(Country)
export class CountryResolver {
  constructor(private countryService: CountryService) {}

  @Query(() => Country)
  getCountry(@Args('id') id: number) {
    return this.countryService.getCountry(id)
  }

  @Query(() => [Country])
  getAllCountries() {
    return this.countryService.getAllCountries()
  }
}
