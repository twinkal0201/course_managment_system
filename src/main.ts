import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable ValidationPipe globally.
  // This automatically runs class-validator on incoming requests based on our DTOs.
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Swagger Documentation Setup
  const config = new DocumentBuilder()
    .setTitle('College Course Enrollment API')
    .setDescription('REST API for managing courses, students, and enrollments.')
    .setVersion('1.0')
    // Add Bearer Auth to Swagger UI so we can test protected routes
    .addBearerAuth()
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  // Serve the Swagger UI at http://localhost:3000/api
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: http://localhost:3000`);
  console.log(`Swagger documentation available at: http://localhost:3000/api`);
}
bootstrap();
