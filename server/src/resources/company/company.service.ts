import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateCompanyInput } from './dto/create-company.input'
import { UpdateCompanyInput } from './dto/update-company.input'

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  getAllCompanies() {
    return this.prisma.company.findMany({ include: { members: true } })
  }

  async getCompany(companyId: number) {
    const company = await this.prisma.company.findUnique({
      where: { id: companyId },
    })

    if (!company) {
      throw new NotFoundException('NOT_FOUND')
    }

    return company
  }

  createCompany(data: CreateCompanyInput, userId: number) {
    const { information, ...companyData } = data
    const address = information?.address || null
    const country = information?.country || null
    const categories = information?.categories || null

    return this.prisma.company.create({
      data: {
        ...companyData,
        information: information
          ? {
              create: {
                description: information.description,
                categories: categories
                  ? {
                      connect: categories?.map((category) => ({
                        id: category.id,
                      })),
                    }
                  : {},
                country: country
                  ? {
                      connect: {
                        id: country.id,
                      },
                    }
                  : {},
                address: address
                  ? {
                      create: {
                        description: address.description,
                        postalCode: address.postalCode,
                        country: {
                          connect: {
                            id: address.country?.id,
                          },
                        },
                      },
                    }
                  : {},
              },
            }
          : {},
        members: {
          create: [
            {
              user: {
                connect: {
                  id: userId,
                },
              },
              roles: ['MEMBER', 'MANAGER', 'OWNER'],
            },
          ],
        },
      },
    })
  }

  updateCompany(data: UpdateCompanyInput) {
    const { id, ...companyData } = data

    return this.prisma.company.update({
      where: {
        id,
      },
      data: {
        ...companyData,
      },
    })
  }

  async deleteCompany(companyId: number) {
    const companyMembers = await this.prisma.companyMember.findMany({
      where: {
        companyId: companyId,
      },
      select: {
        id: true,
      },
    })

    const products = await this.prisma.product.findMany({
      where: {
        companyId: companyId,
      },
      select: {
        id: true,
      },
    })

    await this.prisma.company.update({
      where: {
        id: companyId,
      },
      data: {
        members: {
          delete: companyMembers,
        },
        products: {
          delete: products,
        },
      },
    })

    return this.prisma.company.delete({
      where: {
        id: companyId,
      },
    })
  }
}
