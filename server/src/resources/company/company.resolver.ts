import { IsAuthenticatedGuard } from '@guards/is-authenticated.guard'
import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Parent, ResolveField } from '@nestjs/graphql'
import { PrismaService } from '@resources/prisma/prisma.service'
import { Company } from './company.entity'
import { CompanyService } from './company.service'

@Resolver(Company)
export class CompanyResolver {
  constructor(
    private companyService: CompanyService,
    private prisma: PrismaService
  ) {}

  @Query(() => String)
  helloCompany() {
    return 'helloWorld'
  }

  @UseGuards(IsAuthenticatedGuard)
  @Query(() => [Company], { nullable: true })
  getAllCompanies() {
    return this.companyService.getAllCompanies()
  }

  @ResolveField('members')
  async members(@Parent() company: Company) {
    return this.prisma.company
      .findUnique({ where: { id: company.id } })
      .members()
  }
}
