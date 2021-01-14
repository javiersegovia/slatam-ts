import { IsAuthenticatedGuard } from '@guards/is-authenticated.guard'
import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Parent, ResolveField } from '@nestjs/graphql'
import { PrismaService } from '@resources/prisma/prisma.service'
import { Company } from './company.entity'
import { CompanyService } from './company.service'
import { User } from '@resources/user/user.entity'
import { CurrentUser } from '@decorators/current-user.decorator'
import { Action, CompanyAbility } from './company.ability'
import { ForbiddenError } from '@casl/ability'

@Resolver(Company)
export class CompanyResolver {
  constructor(
    private companyService: CompanyService,
    private ability: CompanyAbility,
    private prisma: PrismaService
  ) {}

  // @Query(() => String)
  // helloCompany() {
  //   return 'helloWorld'
  // }

  @UseGuards(IsAuthenticatedGuard)
  @Query(() => [Company], { nullable: true })
  getAllCompanies(@CurrentUser() user: User) {
    const ability = this.ability.create(user)

    ForbiddenError.from(ability)
      .setMessage("You can't access all companies")
      .throwUnlessCan(Action.READ, Company)

    return this.companyService.getAllCompanies()
  }

  @ResolveField('members')
  async members(@Parent() company: Company) {
    return this.prisma.company
      .findUnique({ where: { id: company.id } })
      .members()
  }
}
