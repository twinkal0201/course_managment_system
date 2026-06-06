// This file defines the "Admin" table in your MySQL database.
// TypeORM reads these decorators and creates/syncs the table automatically.

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('admins') // table name in MySQL
export class Admin {
  // Auto-incrementing primary key
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // Each admin must have a unique email
  @Column({ unique: true })
  email: string;

  // Stored as a bcrypt hash, never plain text
  @Column()
  password: string;

  // Automatically set to current timestamp on insert
  @CreateDateColumn()
  createdAt: Date;
}
