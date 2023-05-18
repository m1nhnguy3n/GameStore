/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsString } from 'class-validator';
export class CreateProductOptionDto {
  @IsString()
  @IsNotEmpty()
  optionName: string;

  productId: number;

}
