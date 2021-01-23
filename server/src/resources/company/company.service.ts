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
    return this.prisma.company.create({
      data: {
        ...data,
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
