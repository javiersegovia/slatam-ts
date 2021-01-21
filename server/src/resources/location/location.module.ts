import { Module } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { AddressResolver } from './address/address.resolver'

@Module({
  providers: [PrismaService, AddressResolver],
})
export class LocationModule {}
