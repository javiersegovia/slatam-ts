import { UseGuards } from '@nestjs/common'
import {
  Resolver,
  Query,
  Parent,
  ResolveField,
  Args,
  Mutation,
} from '@nestjs/graphql'
import { CreateCompanyInput } from './dto/create-company.input'
import { UpdateCompanyInput } from './dto/update-company.input'
import { PrismaService } from '@resources/prisma/prisma.service'
import { Company } from './company.entity'
import { CompanyService } from './company.service'
import { CurrentUser } from '@decorators/current-user.decorator'
import { Action, CompanyAbility } from './company.ability'
import { ForbiddenException } from '@nestjs/common'
import { IsAuthGuard } from '@guards/is-auth.guard'
import { CompanyInformation } from './company-information.entity'
import { TCurrentUser } from '@resources/auth/session.serializer'

@Resolver(Company)
export class CompanyResolver {
  constructor(
    private companyService: CompanyService,
    private ability: CompanyAbility,
    private prisma: PrismaService
  ) {}

  @ResolveField('information', () => CompanyInformation, { nullable: true })
  async information(@Parent() company: Company) {
    return this.prisma.company
      .findUnique({ where: { id: company.id } })
      .information()
  }

  @ResolveField('members')
  async members(@Parent() company: Company) {
    return this.prisma.company
      .findUnique({ where: { id: company.id } })
      .members()
  }

  @Query(() => Company)
  company(@Args('id') id: number, @CurrentUser() user: TCurrentUser) {
    const ability = this.ability.create(user)

    if (!ability.can(Action.READ, Company)) {
      throw new ForbiddenException('FORBIDDEN_ACCESS')
    }

    return this.companyService.getCompany(id)
  }

  @Query(() => [Company], { nullable: true })
  companies(@CurrentUser() user: TCurrentUser) {
    const ability = this.ability.create(user)

    if (!ability.can(Action.READ, Company)) {
      throw new ForbiddenException('FORBIDDEN_ACCESS')
    }

    return this.companyService.getAllCompanies()
  }

  @UseGuards(IsAuthGuard)
  @Mutation(() => Company)
  createCompany(
    @Args('data') data: CreateCompanyInput,
    @CurrentUser() user: TCurrentUser
  ) {
    const ability = this.ability.create(user)

    if (!ability.can(Action.CREATE, Company)) {
      throw new ForbiddenException('FORBIDDEN_ACCESS')
    }

    return this.companyService.createCompany(data, user.id)
  }

  @UseGuards(IsAuthGuard)
  @Mutation(() => Company)
  updateCompany(
    @Args('data') data: UpdateCompanyInput,
    @CurrentUser() user: TCurrentUser
  ) {
    const ability = this.ability.create(user)
    if (ability.cannot(Action.UPDATE, Company)) {
      throw new ForbiddenException('FORBIDDEN_ACCESS')
    }

    return this.companyService.updateCompany(data)
  }

  @UseGuards(IsAuthGuard)
  @Mutation(() => Boolean)
  async deleteCompany(
    @Args('id') id: number,
    @CurrentUser() user: TCurrentUser
  ) {
    const ability = this.ability.create(user)

    if (!ability.can(Action.DELETE, Company)) {
      throw new ForbiddenException('FORBIDDEN_ACCESS')
    }

    const company = await this.companyService.deleteCompany(id)
    return company.id
  }
}
