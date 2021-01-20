import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { ErrorService } from '../error/error.service'
import { CountryInput } from '../country/dto/country.input'

@Injectable()
export class CountryService {
  constructor(private prisma: PrismaService, private error: ErrorService) {}

  async getCountry(countryId: number) {
    const resultCountry = await this.prisma.country.findUnique({
      where: { id: countryId },
    })
    if (!resultCountry) {
      return this.error.handlePrismaNotFoundError({
        code: 'P2015',
        meta: { target: ['country'] },
      })
    }
    return resultCountry
  }

  getAllCountries() {
    return this.prisma.country.findMany()
  }

  async updateCountry(countryId: number, countryInput: CountryInput) {
    const resultCountry = await this.prisma.country.findUnique({
      where: { id: countryId },
    })
    if (!resultCountry) {
      return this.error.handlePrismaNotFoundError({
        code: 'P2015',
        meta: { target: ['country'] },
      })
    }

    return this.prisma.country.update({
      where: {
        id: countryId,
      },
      data: {
        name: countryInput.name,
        flag: countryInput.flag,
        code2: countryInput.code2,
      },
    })
  }
}
