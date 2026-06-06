// Auth service handles registration and login by calling AdminsService and generating JWT tokens.

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AdminsService } from '../admins/admins.service';
import { CreateAdminDto } from '../admins/dto/create-admin.dto';
import { LoginAdminDto } from '../admins/dto/login-admin.dto';

@Injectable()
export class AuthService {
  constructor(
    private adminsService: AdminsService,
    // JwtService is provided by AuthModule's JwtModule import
    private jwtService: JwtService,
  ) {}

  // Registration just delegates to AdminsService
  async register(createAdminDto: CreateAdminDto) {
    return this.adminsService.create(createAdminDto);
  }

  // Login verifies credentials and returns a token
  async login(loginAdminDto: LoginAdminDto) {
    // 1. Find admin by email
    const admin = await this.adminsService.findByEmail(loginAdminDto.email);
    if (!admin) {
      throw new UnauthorizedException('Invalid credentials'); // Always generic errors for security
    }

    // 2. Compare the provided password with the hashed password in DB
    const isPasswordValid = await bcrypt.compare(
      loginAdminDto.password,
      admin.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 3. Create the JWT payload
    const payload = { email: admin.email, sub: admin.id, name: admin.name };

    // 4. Return the generated token
    return {
      message: 'Login successful',
      accessToken: this.jwtService.sign(payload),
    };
  }
}