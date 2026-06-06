// AdminsService handles all database operations for admins.
// We inject the Admin repository (provided by TypeORM) to talk to the database.

import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Admin } from './admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class AdminsService {
  // TypeORM's Repository<Admin> gives us methods like .save(), .findOne(), .find(), etc.
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  // Register a new admin
  async create(createAdminDto: CreateAdminDto): Promise<Omit<Admin, 'password'>> {
    // Check if email already exists
    const existing = await this.adminRepository.findOne({
      where: { email: createAdminDto.email },
    });
    if (existing) {
      throw new ConflictException('An admin with this email already exists');
    }

    // Hash the password before saving (never store plain text passwords!)
    // The number 10 is called "salt rounds" – higher = more secure but slower
    const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);

    // Create the admin object and save to database
    const admin = this.adminRepository.create({
      ...createAdminDto,
      password: hashedPassword,
    });

    const saved = await this.adminRepository.save(admin);

    // Don't send the password back in the response
    const { password, ...result } = saved;
    return result;
  }

  // Find an admin by their email (used during login)
  async findByEmail(email: string): Promise<Admin | null> {
    return this.adminRepository.findOne({ where: { email } });
  }
}
