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
import { User } from '@resources/user/user.entity'
import { CurrentUser } from '@decorators/current-user.decorator'
import { Action, CompanyAbility } from './company.ability'
import { ForbiddenException } from '@nestjs/common'
import { IsAuthGuard } from '@guards/is-auth.guard'

@Resolver(Company)
export class CompanyResolver {
  constructor(
    private companyService: CompanyService,
    private ability: CompanyAbility,
    private prisma: PrismaService
  ) {}

  @Query(() => [Company], { nullable: true })
  async getAllCompanies(@CurrentUser() user: User) {
    const ability = this.ability.create(user)
    if (ability.can(Action.READ, Company)) {
      return this.companyService.getAllCompanies()
    } else {
      throw new ForbiddenException('FORBIDDEN_ACCESS')
    }
  }
  @ResolveField('members')
  async members(@Parent() company: Company) {
    return this.prisma.company
      .findUnique({ where: { id: company.id } })
      .members()
  }

  @Query(() => Company)
  async getCompany(@Args('id') id: number, @CurrentUser() user: User) {
    const ability = this.ability.create(user)
    if (ability.can(Action.READ, Company)) {
      return this.companyService.getCompany(id)
    } else {
      throw new ForbiddenException('FORBIDDEN_ACCESS')
    }
  }
  @UseGuards(IsAuthGuard)
  @Mutation(() => Company)
  createCompany(
    @Args('data') data: CreateCompanyInput,
    @CurrentUser() user: User
  ) {
    const ability = this.ability.create(user)
    if (ability.can(Action.CREATE, Company)) {
      return this.companyService.createCompany(data, user.id)
    } else {
      throw new ForbiddenException('FORBIDDEN_ACCESS')
    }
  }

  @UseGuards(IsAuthGuard)
  @Mutation(() => Company)
  updateCompany(
    @Args('data') data: UpdateCompanyInput,
    @CurrentUser() user: User
  ) {
    const ability = this.ability.create(user)
    if (ability.can(Action.UPDATE, Company)) {
      return this.companyService.updateCompany(data)
    } else {
      throw new ForbiddenException('FORBIDDEN_ACCESS')
    }
  }

  @UseGuards(IsAuthGuard)
  @Mutation(() => Boolean)
  async deleteCompany(@Args('id') id: number, @CurrentUser() user: User) {
    const ability = this.ability.create(user)
    if (ability.can(Action.DELETE, Company)) {
      await this.companyService.deleteCompany(id)
      return true
    } else {
      throw new ForbiddenException('FORBIDDEN_ACCESS')
    }
  }
}
