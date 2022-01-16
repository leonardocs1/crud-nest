import { Inject, Injectable } from "@nestjs/common";
import { MySQLProvider } from "src/database/mysql.provider";

@Injectable()
export class ProductService {
  constructor(@Inject('DATABASE') private readonly mysql: MySQLProvider){}
  async findAll(): Promise<any> {
    return this.mysql.getValue()
  }
}