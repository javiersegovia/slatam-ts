import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { ErrorService } from '../error/error.service'
import { CreateCategoryInput } from './dto/create-category.input'
import { UpdateCategoryInput } from './dto/update-category.input'

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService, private error: ErrorService) {}

  async getCategory(categoryId: number) {
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
    })

    if (!category) {
      throw new NotFoundException('NOT_FOUND')
    }

    return category
  }

  getAllCategories() {
    return this.prisma.category.findMany({
      orderBy: {
        name: 'asc',
      },
    })
  }

  createCategory(data: CreateCategoryInput) {
    return this.prisma.category.create({
      data,
    })
  }

  updateCategory(data: UpdateCategoryInput) {
    const { id, ...categoryData } = data

    return this.prisma.category.update({
      where: {
        id,
      },
      data: {
        ...categoryData,
      },
    })
  }

  deleteCategory(categoryId: number) {
    return this.prisma.category.delete({
      where: {
        id: categoryId,
      },
    })
  }
}
