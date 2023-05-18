import { UpdateProductOptionDto } from './dto/update-product-option.dto';
import { CreateProductOptionDto } from './dto/create-product-option.dto';
/* eslint-disable prettier/prettier */

import { Body, Controller, Get, Param, Post, Put, ParseIntPipe, Delete } from '@nestjs/common';
import { ProductOptionService } from './product-option.service';

@Controller('product-option')
export class ProductOptionController {
  constructor(private productOptionService: ProductOptionService) {}

  @Get()
  getAllProductOption() {
    return this.productOptionService.getAllProductOption();
  }

  @Post()
  createProductOption(@Body() dto: CreateProductOptionDto) {
    return this.productOptionService.createProductOption(dto);
  }

  @Put(':id')
  updateProductOption(
    @Param('id', ParseIntPipe) productOptionId,
    dto: UpdateProductOptionDto,
  ) {
    return this.productOptionService.updateProductOption(productOptionId, dto);
  }

  @Delete(':id')
  deleteProductOption(@Param('id', ParseIntPipe) productOptionId) {
      return this.productOptionService.deleteProductOption(productOptionId)
  }
}
