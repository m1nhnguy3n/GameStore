/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsString } from 'class-validator';
export class UpdateProductOptionDto {
  @IsString()
  @IsNotEmpty()
  optionName: string;

  productId: number;
}
