import { Resolver, ResolveField, Parent } from '@nestjs/graphql'
import { PrismaService } from '@resources/prisma/prisma.service'
import { CompanyMember } from './company-member.entity'

@Resolver(CompanyMember)
export class CompanyMemberResolver {
  constructor(private prisma: PrismaService) {}

  @ResolveField('user')
  user(@Parent() companyMember: CompanyMember) {
    return this.prisma.companyMember
      .findUnique({ where: { id: companyMember.id } })
      .user()
  }

  @ResolveField('company')
  company(@Parent() companyMember: CompanyMember) {
    return this.prisma.companyMember
      .findUnique({ where: { id: companyMember.id } })
      .company()
  }
}
