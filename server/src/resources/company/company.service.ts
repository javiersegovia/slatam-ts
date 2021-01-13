import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  getAllCompanies() {
    return this.prisma.company.findMany({ include: { members: true } })
  }
}
