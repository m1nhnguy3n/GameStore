/* eslint-disable prettier/prettier */

import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateStockStatusDto } from './dto/create-stock-status.dto';
import { UpdateStockStatusDto } from './dto/update-stock-status.dto';

@Injectable()
export class StockStatusService {
  constructor(private prisma: PrismaService) {}

  createProductStatus(dto: CreateStockStatusDto) {
    return this.prisma.stockStatus.create({
      data: {
        ...dto,
      },
    });
  }

  getAllProductStatus() {
    return this.prisma.stockStatus.findMany();
  }

  async updateProductStatus(stockStatusId: number, dto: UpdateStockStatusDto) {
    const productStatus = await this.prisma.stockStatus.findUnique({
      where: {
        id: stockStatusId,
      },
    });

    if (!productStatus)
      throw new ForbiddenException('Product Status Not Found');

    return this.prisma.stockStatus.update({
      where: {
        id: stockStatusId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteProductStatus(stockStatusId: number) {
    const stockStatus = await this.prisma.stockStatus.findUnique({
      where: {
        id: stockStatusId,
      },
    });

    if (!stockStatus) throw new ForbiddenException('Product Status Not Found');

    return this.prisma.stockStatus.delete({
      where: {
        id: stockStatusId,
      },
    });
  }
}
