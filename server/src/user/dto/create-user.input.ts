/* eslint-disable prettier/prettier */
import { IsEmail } from 'class-validator';

export class CreateUserInput {

  password: string;

  firstName: string;

  lastName: string;

  @IsEmail()
  email: string;

  phone: string;

  address: string;

  dateOfBirth?: Date;

  createdAt?: Date;
}
