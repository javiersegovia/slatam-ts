import { Module } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { AddressResolver } from './address/address.resolver'

// TODO Aisar: create state folder with resolver, entity and simple DTO
@Module({
  providers: [PrismaService, AddressResolver],
})
export class LocationModule {}
