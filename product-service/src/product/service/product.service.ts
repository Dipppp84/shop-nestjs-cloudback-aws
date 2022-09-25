import { Injectable } from '@nestjs/common';
import { getProducts } from './getProducts';
import { Product } from '../entities/product.entity';
import { getProductsById } from './getProductsById';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class ProductService {
  async getProducts(): Promise<Product[]> {
    return getProducts().map((value: object) => new Product({ ...value }));
  }

  async getProductsById(id: string): Promise<Product> {
    const product: Product = new Product({ ...getProductsById(id) });
    if (!product.id) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Id: ${id} doesn't exist`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return product;
  }
}
