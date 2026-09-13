# Job Board API

A RESTful Job Board API built with Node.js, Express, TypeScript, PostgreSQL, and Prisma.

The API allows job seekers to create profiles, upload CVs, browse jobs, and apply for them. Employers can create jobs, view applicants, and update application statuses.

## Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT Authentication
- bcrypt
- Joi Validation
- Multer
- Swagger / OpenAPI
- Vitest
- Supertest
- Helmet
- CORS
- Express Rate Limit

## Features

### Authentication

- Register as Job Seeker or Employer
- Login with JWT
- Get current authenticated user
- Role-based authorization

### Job Seekers

- Create or update profile
- Upload CV as PDF
- Browse jobs
- Search and filter jobs
- Apply for jobs
- View submitted applications

### Employers

- Create jobs
- Update and delete owned jobs
- View applicants
- Accept or reject applications
- Create or update company profile

### Security

- Password hashing with bcrypt
- JWT authentication
- Role-based authorization
- Joi request validation
- Helmet security headers
- CORS configuration
- Authentication rate limiting

## API Documentation

Swagger documentation is available at:

```text
http://localhost:3000/api-docs
```

## Installation

Clone the repository:

```bash
git clone https://github.com/ShazaElsayedIsmail11/job-board-api.git
cd job-board-api
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=3000
DATABASE_URL=your_database_url
TEST_DATABASE_URL=your_test_database_url
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
```

Generate Prisma Client:

```bash
npx prisma generate
```

Apply database migrations:

```bash
npx prisma migrate deploy
```

Run the development server:

```bash
npm run dev
```

## Testing

Run integration tests:

```bash
npm test
```

The project uses Vitest and Supertest to test authentication, jobs, and applications using a separate test database.

## Build

Compile TypeScript:

```bash
npm run build
```

Run the production build:

```bash
npm start
```

## Main API Routes

```text
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me

GET    /api/jobs
GET    /api/jobs/:id
POST   /api/jobs
PATCH  /api/jobs/:id
DELETE /api/jobs/:id

POST   /api/jobs/:id/apply
GET    /api/jobs/:id/applications

GET    /api/applications/me
PATCH  /api/applications/:id/status

GET    /api/profiles/me
PUT    /api/profiles/seeker/me
PUT    /api/profiles/employer/me
PATCH  /api/profiles/seeker/cv
```

## Architecture

The project follows a layered structure:

```text
Route
  ↓
Middleware / Validation
  ↓
Controller
  ↓
Service
  ↓
Prisma ORM
  ↓
PostgreSQL
```

## Notes

CV files are currently stored on the server filesystem and their paths are stored in the database.

For a production-scale application, file storage should be moved to a dedicated cloud storage service such as S3 or Cloudinary.