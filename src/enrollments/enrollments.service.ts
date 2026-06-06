// Enrollments Service contains the "Engine" logic.
// It performs all logical safeguards requested in the challenge.

import {
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Enrollment } from './enrollment.entity';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { CoursesService } from '../courses/courses.service';
import { StudentsService } from '../students/students.service';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectRepository(Enrollment)
    private enrollmentRepository: Repository<Enrollment>,
    private coursesService: CoursesService,
    private studentsService: StudentsService,
    private dataSource: DataSource, // For transactions
  ) {}

  async enroll(createEnrollmentDto: CreateEnrollmentDto) {
    const { studentId, courseId } = createEnrollmentDto;

    // 1. Verify student exists
    await this.studentsService.findOne(studentId);

    // 2. Verify course exists
    const course = await this.coursesService.findOne(courseId);

    // 3. Check for Duplicate Enrollment (Safeguard 1)
    const existingEnrollment = await this.enrollmentRepository.findOne({
      where: { studentId, courseId },
    });
    if (existingEnrollment) {
      throw new ConflictException(
        `Student ${studentId} is already enrolled in course ${courseId}`,
      );
    }

    // 4. Check Course Capacity (Safeguard 2)
    if (course.currentEnrollments >= course.maxCapacity) {
      throw new BadRequestException(
        `Enrollment failed: Course "${course.title}" has reached its maximum capacity of ${course.maxCapacity}.`,
      );
    }

    // 5. Save the enrollment AND update the course count in a single Transaction
    // A transaction ensures that if one step fails, both are rolled back.
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Create and save the enrollment
      const enrollment = this.enrollmentRepository.create({
        studentId,
        courseId,
      });
      const savedEnrollment = await queryRunner.manager.save(enrollment);

      // Increment the course's currentEnrollments counter
      course.currentEnrollments += 1;
      await queryRunner.manager.save(course);

      // Commit the transaction
      await queryRunner.commitTransaction();

      return {
        message: 'Enrollment successful',
        enrollment: savedEnrollment,
      };
    } catch (err) {
      // If anything fails, rollback the transaction
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      // Release the database connection
      await queryRunner.release();
    }
  }

  async findAll() {
    // Return all enrollments with the related student and course data
    return this.enrollmentRepository.find({
      relations: { student: true, course: true },
    });
  }
}
