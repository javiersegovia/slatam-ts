import { Module } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CompanyService } from './company.service'
import { CompanyResolver } from './company.resolver'
import { CompanyMemberResolver } from './company-member/company-member.resolver'

@Module({
  providers: [
    PrismaService,
    CompanyService,
    CompanyResolver,
    CompanyMemberResolver,
  ],
})
export class CompanyModule {}
