import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
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
import { PublisherService } from './publisher.service';

@Controller('publisher')
export class PublisherController {
  constructor(private publisherService: PublisherService) {}

  @Get()
  getAllPublishers() {
    return this.publisherService.getAllPublishers();
  }

  @Post()
  createPublisher(@Body() createPublisher: CreatePublisherDto) {
    return this.publisherService.createPublisher(createPublisher);
  }
  @Put(':id')
  updatePublisher(
    @Param('id', ParseIntPipe) publisherId: number,
    @Body() dto: UpdatePublisherDto,
  ) {
    return this.publisherService.updatePublisher(publisherId, dto);
  }
  @Delete(':id')
  deletePublisher(@Param('id', ParseIntPipe) publisherId: number) {
    return this.publisherService.deletePublisher(publisherId);
  }
}
