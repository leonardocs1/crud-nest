import { Inject, Injectable } from "@nestjs/common";
import { MySQLProvider } from "src/database/mysql.provider";
import { Category } from "./category.entity";
import { CategoryInput } from "./dto/category.input";

@Injectable()
export class CategoryService {
  constructor(@Inject('DATABASE') private readonly mysql: MySQLProvider){}
 
  async create(entity: Category): Promise<Category> {
    const conn = await this.mysql.getConnection()
    await conn.query('insert into categories (category) values (?)', entity.category)
    return entity
  }

  async remove(id: string): Promise<Boolean> {
    const conn = await this.mysql.getConnection()
    await conn.query('delete from categories where id = ? limit 1', [id])
    return true
  }

  async  update(id: string, entity: CategoryInput): Promise<Boolean> {
    const conn = await this.mysql.getConnection()
    await conn.query('update categories set category = ? where id = ?', [entity.category, id])
    return true
  }

  async findAll(): Promise<Category[]> {
    const conn = await this.mysql.getConnection()
    const [results] = await conn.query('select * from categories')
    const resultsPlain = JSON.parse(JSON.stringify(results))
    const categories = resultsPlain.map(category => {
      const categoryEntity = new Category()
      categoryEntity.id = category.id
      categoryEntity.category = category.category
      return categoryEntity
    })
    return categories
  }

  async findAllById(id: string): Promise<Category> {
    const conn = await this.mysql.getConnection()
    const [results] = await conn.query('select * from categories where id = ?', [id])
    console.log(results)
    const resultsPlain = JSON.parse(JSON.stringify(results))
    const categories = resultsPlain.map(category => {
      const categoryEntity = new Category()
      categoryEntity.id = category.id
      categoryEntity.category = category.category
      return categoryEntity
    })
    return categories[0]
  }
}