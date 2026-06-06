// DTO for registering a new student.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateStudentDto {
  @ApiProperty({ example: 'Alice Johnson', description: 'Full name of the student' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty({ example: 'alice@student.com', description: 'Student email (must be unique)' })
  @IsEmail({}, { message: 'Please provide a valid email' })
  email: string;

  @ApiPropertyOptional({ example: '+91-9876543210', description: 'Phone number (optional)' })
  @IsOptional()
  phone?: string;
}
