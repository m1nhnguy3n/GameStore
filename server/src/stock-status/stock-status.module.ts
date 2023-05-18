import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ProductStatusController } from './stock-status.controller';
import { StockStatusService } from './stock-status.service';

@Module({
  providers: [StockStatusService, PrismaService],
  controllers: [ProductStatusController],
})
export class StockStatusModule {}
