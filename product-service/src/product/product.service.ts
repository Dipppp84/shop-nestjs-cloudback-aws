import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { checkId } from '../utils/validate';
import { Stock } from './entities/stocks.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Stock)
    private stockRepository: Repository<Stock>,
  ) {}

  async getProducts(): Promise<ProductDto[]> {
    let products: Product[];
    try {
      products = await this.productRepository.find();
    } catch (err) {
      console.log(err.toString());
      throw err;
    }
    return products.map((product) => {
      const { stock, ...rest } = product;
      return { ...rest, count: stock.count };
    });
  }

  async getProductsById(id: string): Promise<ProductDto> {
    checkId(id);
    let product: Product;
    try {
      product = await this.productRepository.findOne({
        where: { id: id },
      });
    } catch (err) {
      console.log(err.toString());
      throw err;
    }
    if (!product) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Id: ${id} doesn't exist`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const { stock, ...rest } = product;
    return { ...rest, count: stock.count };
  }

  async createProduct({
    count,
    ...product
  }: CreateProductDto): Promise<ProductDto> {
    try {
      const saveProduct: Product = await this.productRepository.save(product);
      const stock = new Stock({ product_id: saveProduct, count: count });
      let saveStock;
      try {
        saveStock = await this.stockRepository.save(stock);
      } catch (err) {
        await this.productRepository.delete(saveProduct.id);
      }
      return { ...saveProduct, count: saveStock.count };
    } catch (err) {
      console.log(err.toString());
      throw err;
    }
  }
}
