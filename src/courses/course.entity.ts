// Defines the "courses" table in MySQL.

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Enrollment } from '../enrollments/enrollment.entity';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  // nullable: true means it's optional
  @Column({ type: 'text', nullable: true })
  description: string;

  // How many students can join this course
  @Column()
  maxCapacity: number;

  // How many students are currently enrolled (starts at 0)
  @Column({ default: 0 })
  currentEnrollments: number;

  @CreateDateColumn()
  createdAt: Date;

  // One course can have many enrollments
  @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
  enrollments: Enrollment[];
}
