/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  productName: string;

  @IsNotEmpty()
  publisherId: number;

  @IsNotEmpty()
  categoryId: number;

  description?: string;

  @IsNotEmpty()
  price: number;

  available?: number;

  createdAt: Date;

  image?: string;

  statusId?: number;
}
