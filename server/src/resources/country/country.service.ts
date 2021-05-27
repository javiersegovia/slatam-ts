import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { ErrorService } from '../error/error.service'

@Injectable()
export class CountryService {
  constructor(private prisma: PrismaService, private error: ErrorService) {}

  async getCountry(countryId: number) {
    const country = await this.prisma.country.findUnique({
      where: { id: countryId },
    })

    if (!country) {
      throw new NotFoundException('NOT_FOUND')
    }

    return country
  }

  getAllCountries() {
    return this.prisma.country.findMany({
      orderBy: {
        name: 'asc',
      },
    })
  }

  deleteCountry(countryId: number) {
    return this.prisma.country.delete({
      where: {
        id: countryId,
      },
    })
  }
}
