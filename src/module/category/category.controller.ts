import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { Category } from "./category.entity";

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Post()
  async create(@Body() category: Category): Promise<Category> {
    return this.categoryService.create(category)
  }
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Boolean> {
    return this.categoryService.remove(id)
  }
  @Patch(':id')
  async update(@Param('id') id: string, @Body() category: Category): Promise<Boolean> {
    return this.categoryService.update(id, category)
  }
  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAll()
  }

  @Get(':id')
  async findAllById(@Param('id') id: string): Promise<Category> {
    return this.categoryService.findAllById(id)
  }
}