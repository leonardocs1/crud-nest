import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductService {
  async findAll(): Promise<any> {
    return [
      {id: 1},
      {id: 2},
      {id: 3},
      {id: 4},
    ]
  }
}