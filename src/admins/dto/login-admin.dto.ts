// DTO for admin login – only needs email and password.

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginAdminDto {
  @ApiProperty({ example: 'admin@college.com' })
  @IsEmail({}, { message: 'Please provide a valid email' })
  email: string;

  @ApiProperty({ example: 'secret123' })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
