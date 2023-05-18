/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dt';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  getProductById(@Param('id', ParseIntPipe) productId) {
    return this.productService.getProductById(productId);
  }

  @Get('search/:name')
  async getProductByName(@Param('name') name: string) {
    return await this.productService.getProductByName(name);
  }

  @Post()
  createProduct(@Body() dto: CreateProductDto) {
    return this.productService.createProduct(dto);
  }

  @Put(':id')
  updateProduct(
    @Param('id', ParseIntPipe) productId,
    @Body() dto: UpdateProductDto,
  ) {
    return this.productService.updateProduct(productId, dto);
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) productId) {
    return this.productService.deleteProduct(productId);
  }
}
