import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductDto } from './dto/product.dto';
import { CreateProductDto } from "./dto/create-product.dto";

@ApiTags('Product')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    type: [ProductDto],
  })
  async getProducts(): Promise<ProductDto[]> {
    return this.productService.getProducts();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single Product by id' })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    type: ProductDto,
  })
  @ApiResponse({ status: 404, description: 'Product was not found' })
  async getProductsById(@Param('id') id: string): Promise<ProductDto> {
    return this.productService.getProductsById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Add new Product' })
  @ApiResponse({
    status: 201,
    description: 'Album is created',
    type: ProductDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. body does not contain required fields',
  })
  @ApiBody({ type: CreateProductDto })
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductDto> {
    return this.productService.createProduct(createProductDto);
  }
}
