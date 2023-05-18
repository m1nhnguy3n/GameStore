/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePublisherDto {
  @IsNotEmpty()
  @IsString()
  publisherName: string;
}
