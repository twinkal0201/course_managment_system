// DTO for enrolling a student into a course.

import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class CreateEnrollmentDto {
  @ApiProperty({ example: 1, description: 'ID of the student to enroll' })
  @IsInt({ message: 'studentId must be an integer' })
  @IsPositive({ message: 'studentId must be positive' })
  studentId: number;

  @ApiProperty({ example: 1, description: 'ID of the course to enroll in' })
  @IsInt({ message: 'courseId must be an integer' })
  @IsPositive({ message: 'courseId must be positive' })
  courseId: number;
}
