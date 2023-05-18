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
import { CreateStockStatusDto } from './dto/create-stock-status.dto';
import { UpdateStockStatusDto } from './dto/update-stock-status.dto';
import { StockStatusService } from './stock-status.service';

@Controller('stock-status')
export class ProductStatusController {
  constructor(private stockStatusService: StockStatusService) {}

  @Post()
  createStockStatus(@Body() dto: CreateStockStatusDto) {
    return this.stockStatusService.createProductStatus(dto);
  }

  @Get()
  getAllStockStatus() {
    return this.stockStatusService.getAllProductStatus();
  }

  @Put(':id')
  updateStockStatus(
    @Param('id', ParseIntPipe) stockStatusId,
    @Body() dto: UpdateStockStatusDto,
  ) {
    return this.stockStatusService.updateProductStatus(stockStatusId, dto);
  }

  @Delete(':id')
  deleteStockStatus(@Param('id', ParseIntPipe) stockStatusId) {
    return this.stockStatusService.deleteProductStatus(stockStatusId);
  }
}
