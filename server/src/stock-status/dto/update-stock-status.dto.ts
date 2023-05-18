/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';
export class UpdateStockStatusDto {
  @IsNotEmpty()
  @IsString()
  statusName: string;
}
