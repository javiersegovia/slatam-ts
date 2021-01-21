import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { Category } from './category.entity'
import { CategoryService } from './category.service'
import { PrismaService } from '@resources/prisma/prisma.service'
import { CreateCategoryInput } from './dto/create-category.input'
import { UpdateCategoryInput } from './dto/update-category.input'

@Resolver(Category)
export class CategoryResolver {
  constructor(
    private categoryService: CategoryService,
    private prisma: PrismaService
  ) {}

  @Query(() => Category)
  async getCategory(@Args('id') id: number) {
    return this.categoryService.getCategory(id)
  }

  @Query(() => [Category], { nullable: true })
  getAllCategories() {
    return this.categoryService.getAllCategories()
  }

  @Mutation(() => Category)
  createCategory(@Args('data') data: CreateCategoryInput) {
    return this.categoryService.createCategory(data)
  }

  @Mutation((_returns) => Category)
  updateCategory(@Args('data') data: UpdateCategoryInput) {
    return this.categoryService.updateCategory(data)
  }

  @Mutation((_returns) => Boolean)
  async deleteCategory(@Args('id') id: number) {
    await this.categoryService.deleteCategory(id)

    return true
  }
}
