import { Body, Controller, Delete, Get, Param, Post, Patch } from '@nestjs/common'
import { Product } from './product.entity'
import { ProductService } from './product.service'

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService){}
  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll()
  }
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Product> {
    return this.productService.findById(id)
  }
  @Post()
  async create(@Body() product: Product): Promise<Product> {
    return this.productService.create(product)
  }
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Boolean> {
    return this.productService.remove(id)
  }
  @Patch(':id')
  async update(@Param('id') id: number, @Body() product: Product): Promise<Boolean> {
    return this.productService.update(id, product)
  }
}
