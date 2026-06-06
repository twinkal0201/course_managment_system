// Defines the "students" table in MySQL.

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Enrollment } from '../enrollments/enrollment.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // Each student must have a unique email
  @Column({ unique: true })
  email: string;

  // Phone number is optional
  @Column({ nullable: true })
  phone: string;

  @CreateDateColumn()
  createdAt: Date;

  // One student can enroll in many courses
  @OneToMany(() => Enrollment, (enrollment) => enrollment.student)
  enrollments: Enrollment[];
}
