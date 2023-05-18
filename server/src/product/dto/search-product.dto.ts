/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';

export class SearchProductDto {
  @IsString()
  name: string;
}
