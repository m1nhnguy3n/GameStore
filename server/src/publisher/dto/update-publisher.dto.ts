/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePublisherDto {
  @IsNotEmpty()
  @IsString()
  publisherName: string;
}
