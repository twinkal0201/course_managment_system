// Defines the "enrollments" table in MySQL.
// The unique constraint on (studentId, courseId) prevents duplicate enrollments.

import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
  Unique,
} from 'typeorm';
import { Student } from '../students/student.entity';
import { Course } from '../courses/course.entity';

// This ensures one student can only enroll in a course ONCE
@Unique(['studentId', 'courseId'])
@Entity('enrollments')
export class Enrollment {
  @PrimaryGeneratedColumn()
  id: number;

  // Foreign key linking to the students table
  @Column()
  studentId: number;

  // Foreign key linking to the courses table
  @Column()
  courseId: number;

  // ManyToOne: many enrollments can belong to one student
  @ManyToOne(() => Student, (student) => student.enrollments)
  @JoinColumn({ name: 'studentId' })
  student: Student;

  // ManyToOne: many enrollments can belong to one course
  @ManyToOne(() => Course, (course) => course.enrollments)
  @JoinColumn({ name: 'courseId' })
  course: Course;

  // Timestamp for when the enrollment happened
  @CreateDateColumn()
  enrolledAt: Date;
}
