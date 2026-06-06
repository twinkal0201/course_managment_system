// The Admins module registers everything related to admins.
// We import TypeOrmModule.forFeature([Admin]) to make the Admin repository available for injection.

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { AdminsService } from './admins.service';

@Module({
  // Register the Admin entity so TypeORM creates/manages its table
  imports: [TypeOrmModule.forFeature([Admin])],
  // Make AdminsService available to other modules (like AuthModule)
  providers: [AdminsService],
  exports: [AdminsService],
})
export class AdminsModule {}
