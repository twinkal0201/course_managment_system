// DTOs (Data Transfer Objects) define the shape of data coming in from API requests.
// class-validator decorators automatically validate the request body.
// ApiProperty() decorators make the fields visible in Swagger UI.

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({ example: 'John Admin', description: 'Full name of the admin' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty({ example: 'admin@college.com', description: 'Admin email address' })
  @IsEmail({}, { message: 'Please provide a valid email' })
  email: string;

  @ApiProperty({ example: 'secret123', description: 'Password (min 6 characters)' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;
}
