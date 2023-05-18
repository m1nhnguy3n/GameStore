import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from './../../prisma/prisma.service';

@Injectable()
export class PublisherService {
  constructor(private prisma: PrismaService) {}

  createPublisher(createCategoryDto: CreatePublisherDto) {
    return this.prisma.publisher.create({
      data: {
        ...createCategoryDto,
      },
    });
  }

  async getAllPublishers() {
    return await this.prisma.publisher.findMany({});
  }

  async updatePublisher(
    publisherId: number,
    updatePublisherDto: UpdatePublisherDto,
  ) {
    //Get publisher by Id
    const publisher = await this.prisma.publisher.findUnique({
      where: {
        id: publisherId,
      },
    });

    if (!publisher || publisher.id !== publisherId)
      throw new ForbiddenException('Publisher not found');

    return this.prisma.publisher.update({
      where: {
        id: publisherId,
      },
      data: {
        ...updatePublisherDto,
      },
    });
  }

  async deletePublisher(publisherId: number) {
    //Get publisher by Id
    const publisher = await this.prisma.publisher.findUnique({
      where: {
        id: publisherId,
      },
    });

    if (!publisher || publisher.id !== publisherId)
      throw new ForbiddenException('Publisher not found');

    return this.prisma.category.delete({
      where: {
        id: publisherId,
      },
    });
  }
}
