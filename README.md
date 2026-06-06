# College Course Enrollment System API

A RESTful backend application built with **NestJS**, **TypeORM**, **MySQL**, and **JWT Authentication** for managing college courses and student enrollments.

## Features

### Authentication & Admin Management

* Admin Registration
* Admin Login
* JWT-based Authentication
* Protected Administrative Endpoints

### Student Management

* Register Student
* View Students
* Update Student Information
* Delete Student

### Course Management

* Create Course
* View Available Courses
* Update Course Details
* Delete Course

### Enrollment Management

* Enroll Students into Courses
* Prevent Duplicate Enrollments
* Enforce Course Capacity Limits
* Maintain Data Integrity

### API Documentation

* Interactive Swagger Documentation
* Request/Response Validation
* Bearer Token Authentication Support

---

## Technology Stack

* NestJS
* TypeScript
* MySQL
* TypeORM
* JWT Authentication
* Passport.js
* Swagger
* Class Validator
* Bcrypt

---

## Project Structure

```text
src/
├── auth/
├── admins/
├── students/
├── courses/
├── enrollments/
├── common/
│   ├── guards/
│   ├── filters/
│   ├── decorators/
│   └── interceptors/
├── config/
├── database/
└── main.ts
```

---

## Business Rules

The Enrollment Engine enforces the following constraints:

* A student cannot enroll in the same course more than once.
* Enrollment is rejected if the course has reached maximum capacity.
* Student must exist before enrollment.
* Course must exist before enrollment.
* Appropriate HTTP exceptions are returned for all business logic violations.

---

## Installation

```bash
npm install
```

---

## Running the Application

### Development

```bash
npm run start:dev
```

### Production

```bash
npm run build
npm run start:prod
```

---

## API Documentation

After starting the application, Swagger documentation will be available at:

```bash
http://localhost:3000/api
```

The Swagger UI provides:

* Endpoint Testing
* Request Validation
* Authentication Support
* API Documentation

---

## Main API Endpoints

### Authentication

| Method | Endpoint       |
| ------ | -------------- |
| POST   | /auth/register |
| POST   | /auth/login    |

### Students

| Method | Endpoint      |
| ------ | ------------- |
| POST   | /students     |
| GET    | /students     |
| GET    | /students/:id |
| PATCH  | /students/:id |
| DELETE | /students/:id |

### Courses

| Method | Endpoint     |
| ------ | ------------ |
| POST   | /courses     |
| GET    | /courses     |
| GET    | /courses/:id |
| PATCH  | /courses/:id |
| DELETE | /courses/:id |

### Enrollments

| Method | Endpoint         |
| ------ | ---------------- |
| POST   | /enrollments     |
| GET    | /enrollments     |
| GET    | /enrollments/:id |

---

## Database Entities

### Admin

* id
* name
* email
* password

### Student

* id
* firstName
* lastName
* email

### Course

* id
* title
* description
* courseCode
* maxCapacity

### Enrollment

* id
* studentId
* courseId
* enrolledAt

---

## Validation & Security

* DTO Validation using class-validator
* Global ValidationPipe
* Password Hashing with bcrypt
* JWT Authentication
* Protected Routes using Guards
* Exception Handling using NestJS HTTP Exceptions

---

## Testing

```bash
npm run test
```

```bash
npm run test:e2e
```

```bash
npm run test:cov
```

---

## Author

Developed as part of a NestJS Backend Developer Practical Assessment.

---

## License

This project is licensed under the MIT License.
