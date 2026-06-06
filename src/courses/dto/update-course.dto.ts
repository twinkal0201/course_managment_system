// DTO for updating a course. All fields are optional (PartialType makes them all optional).

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, Min } from 'class-validator';

export class UpdateCourseDto {
  @ApiPropertyOptional({ example: 'Advanced Python' })
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ example: 'Updated description' })
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: 50 })
  @IsOptional()
  @IsInt()
  @Min(1)
  maxCapacity?: number;
}
