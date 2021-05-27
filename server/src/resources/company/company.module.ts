import { Module } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CompanyService } from './company.service'
import { CompanyResolver } from './company.resolver'
import { CompanyInformationResolver } from './company-information.resolver'
import { CompanyMemberResolver } from './company-member/company-member.resolver'
import { CompanyAbility } from './company.ability'

@Module({
  providers: [
    PrismaService,
    CompanyService,
    CompanyResolver,
    CompanyMemberResolver,
    CompanyInformationResolver,
    CompanyAbility,
  ],
  exports: [CompanyAbility],
})
export class CompanyModule {}
