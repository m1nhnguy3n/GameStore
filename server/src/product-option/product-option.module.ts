/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ProductOptionController } from './product-option.controller';
import { ProductOptionService } from './product-option.service';

@Module({
  providers: [ProductOptionService, PrismaService],
  controllers: [ProductOptionController],
})
export class ProductOptionModule {}
