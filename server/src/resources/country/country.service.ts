import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class CountryService {
  constructor(private prisma: PrismaService) {}

  getCountry(countryId: number) {
    return this.prisma.country.findUnique({
      where: { id: countryId },
    })
  }

  getAllCountries() {
    return this.prisma.country.findMany()
  }
}
