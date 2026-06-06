import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { StudentsModule } from './students/students.module';
import { CoursesModule } from './courses/courses.module';
import { AuthModule } from './auth/auth.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { AdminsModule } from './admins/admins.module';

@Module({
  imports: [
    // Load environment variables from .env file
    ConfigModule.forRoot({ isGlobal: true }),
    
    // Connect to MySQL database
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'Tinkal$$6',
      database: 'student_db',
      
      autoLoadEntities: true,
      
      // synchronize: true creates/updates the database tables automatically.
      // DANGER: Never use synchronize: true in production, it can drop data!
      synchronize: true,
    }),
    
    // Feature Modules
    AdminsModule,
    AuthModule,
    CoursesModule,
    StudentsModule,
    EnrollmentsModule,
  ],
})
export class AppModule {}