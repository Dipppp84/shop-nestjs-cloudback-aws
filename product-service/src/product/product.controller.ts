import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './service/product.service';
import { Product } from './entities/product.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Product')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    type: [Product],
  })
  async getProducts(): Promise<Product[]> {
    return this.productService.getProducts();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single Product by id' })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    type: Product,
  })
  @ApiResponse({ status: 404, description: 'Product was not found' })
  async getProductsById(@Param('id') id: string): Promise<Product> {
    return this.productService.getProductsById(id);
  }
}
