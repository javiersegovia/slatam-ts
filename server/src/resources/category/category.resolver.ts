import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql'
import { Category } from './category.entity'
import { CategoryService } from './category.service'
import { CreateCategoryInput } from './dto/create-category.input'
import { UpdateCategoryInput } from './dto/update-category.input'

@Resolver(Category)
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @Query(() => Category)
  async category(@Args('id') id: number) {
    return this.categoryService.getCategory(id)
  }

  @Query(() => [Category], { nullable: true })
  categories() {
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

  @Mutation((_returns) => Int)
  async deleteCategory(@Args('id') id: number) {
    const category = await this.categoryService.deleteCategory(id)

    return category.id
  }
}
