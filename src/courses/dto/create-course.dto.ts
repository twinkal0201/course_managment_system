// DTO for creating a new course.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({ example: 'Introduction to Python', description: 'Course title' })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @ApiPropertyOptional({ example: 'Learn Python from scratch', description: 'Course description' })
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 30, description: 'Maximum number of students allowed' })
  @IsInt({ message: 'maxCapacity must be a whole number' })
  @Min(1, { message: 'At least 1 seat required' })
  maxCapacity: number;
}
