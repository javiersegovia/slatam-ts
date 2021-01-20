import { Module } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CountryService } from './country.service'
import { CountryResolver } from './country.resolver'

@Module({
  providers: [PrismaService, CountryService, CountryResolver],
})
export class CountryModule {}
