import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { ErrorService } from '../error/error.service'
import { UpdateCountryInput } from './dto/update-country.input'
import { CreateCountryInput } from './dto/create-country.input'

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
    return this.prisma.country.findMany()
  }

  createCountry(data: CreateCountryInput) {
    return this.prisma.country.create({
      data,
    })
  }

  updateCountry(data: UpdateCountryInput) {
    const { id, ...countryData } = data

    return this.prisma.country.update({
      where: {
        id,
      },
      data: {
        ...countryData,
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
