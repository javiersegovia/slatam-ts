import { Resolver, ResolveField, Parent, Root } from '@nestjs/graphql'
import { Company } from './company.entity'
import { PrismaService } from '../prisma/prisma.service'
import { CompanyInformation } from './company-information.entity'
import { Address } from '@resources/location/address/address.entity'
import { Category } from '@resources/category/category.entity'
import { Country } from '@resources/country/country.entity'

@Resolver(CompanyInformation)
export class CompanyInformationResolver {
  constructor(private prisma: PrismaService) {}

  @ResolveField('company', () => Company)
  company(@Root() companyInfo: CompanyInformation) {
    return this.prisma.companyInformation
      .findUnique({
        where: { id: companyInfo.id },
      })
      .company()
  }

  @ResolveField('country', () => Country)
  country(@Root() companyInfo: CompanyInformation) {
    return this.prisma.companyInformation
      .findUnique({
        where: { id: companyInfo.id },
      })
      .country()
  }

  @ResolveField('address', () => [Address], { nullable: true })
  address(@Parent() companyInfo: CompanyInformation) {
    return this.prisma.address.findMany({
      where: {
        companyInfoId: companyInfo.id,
      },
    })
  }

  @ResolveField('categories', () => [Category], { nullable: true })
  categories(@Parent() companyInfo: CompanyInformation) {
    return this.prisma.companyInformation
      .findUnique({
        where: { id: companyInfo.id },
      })
      .categories()
  }
}
