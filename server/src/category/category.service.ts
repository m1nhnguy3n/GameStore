/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  createCategory(dto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: {
        ...dto,
      },
    });
  }

  async getAllCategories() {
    return await this.prisma.category.findMany({});
  }

  async updateCategory(
    categoryId: number,
    updateCategoryDto: UpdateCategoryDto,
  ) {
    //Get category by Id
    const category = await this.prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!category || category.id !== categoryId)
      throw new ForbiddenException('Category not found');

    return await this.prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        ...updateCategoryDto,
      },
    });
  }

  async deleteCategory(categoryId: number) {
    //Get category by Id
    const category = await this.prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!category || category.id !== categoryId)
      throw new ForbiddenException('Category not found');

    return this.prisma.category.delete({
      where: {
        id: categoryId,
      },
    });
  }
}
