// Auth module wires up Passport and JWT.

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminsModule } from '../admins/admins.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    AdminsModule, // We need AdminsService inside AuthService
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'my-super-secret-key',
      signOptions: { expiresIn: '1h' }, // Token expires in 1 hour
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
