import { Mutation, Resolver, Args, Query } from "@nestjs/graphql";
import { Category } from "./dto/category"
import {CategoryService} from './category.service'
import { CategoryInput } from "./dto/category.input";

@Resolver(of => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService){}
  @Mutation(returns => Category, {name: 'createCategory'})
  async create(@Args('input') input: CategoryInput): Promise<Category> {
    return this.categoryService.create(input)
  }

  @Mutation(returns => Boolean, {name: 'removeCategory'})
  async remove(@Args('id') id: string): Promise<Boolean> {
    return this.categoryService.remove(id)
  }

  @Mutation(returns => Boolean, {name: 'updateCategory'})
  async update(@Args('input') input: CategoryInput, @Args('id') id: string): Promise<Boolean> {
    this.categoryService.update(id, input)
    return true
  }

  @Query(returns => [Category], {name: 'getAllCategories'})
  async getAllCategories(): Promise<Category[]> {
    const categories = await this.categoryService.findAll()
    const categoriesToReturn = categories.map(category => {
      const categoryToReturn = new Category()
      categoryToReturn.id = category.id
      categoryToReturn.category = category.category
      return categoryToReturn
    })
    return categoriesToReturn
  }

  @Query(returns => Category, {name: 'getCategoryById'})
  async getCategoryById(@Args('id') id: string): Promise<Category> {
    return this.categoryService.findAllById(id)
  }
}