# Job Board API

A RESTful Job Board API built with Node.js, Express, TypeScript, PostgreSQL, and Prisma.

The API supports two roles: **Job Seekers** and **Employers**.

Job seekers can browse jobs, manage their profiles, upload CVs, and apply for jobs. Employers can create and manage job posts, view applicants, and update application statuses.

## Live API

Base URL:

```text
https://job-board-api-ashen.vercel.app
```

Swagger documentation:

```text
https://job-board-api-ashen.vercel.app/api-docs
```

Health check:

```text
https://job-board-api-ashen.vercel.app/health
```

## Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT
- bcrypt
- Joi
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
- Get the current authenticated user
- Role-based authorization

### Job Seekers

- Create and update profiles
- Add bio and skills
- Upload CVs
- Browse and search jobs
- Filter and paginate job results
- Apply for jobs
- View submitted applications

### Employers

- Create and update company profiles
- Create job posts
- Update and delete owned jobs
- View job applicants
- Accept or reject applications

## API Routes

### Auth

```text
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
```

### Jobs

```text
GET    /api/jobs
GET    /api/jobs/:id
POST   /api/jobs
PATCH  /api/jobs/:id
DELETE /api/jobs/:id
```

### Applications

```text
POST   /api/jobs/:id/apply
GET    /api/jobs/:id/applications
GET    /api/applications/me
PATCH  /api/applications/:id/status
```

### Profiles

```text
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

## Search and Pagination

The jobs endpoint supports search, filtering, and pagination.

Example:

```text
GET /api/jobs?page=1&limit=10&search=node&employerId=1
```

## Authentication

Protected routes use JWT authentication.

Send the token in the Authorization header:

```text
Authorization: Bearer YOUR_TOKEN
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

Create a `.env` file based on `.env.example`:

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

Apply migrations:

```bash
npx prisma migrate deploy
```

Run the development server:

```bash
npm run dev
```

## Testing

Run the test suite with:

```bash
npm test
```

The project uses Vitest and Supertest for integration testing, with a separate test database.

## Build

Build the project:

```bash
npm run build
```

Run the production build:

```bash
npm start
```

## Deployment

The API is deployed on Vercel.

Production environment variables are configured through Vercel and are not stored in the repository.

## CV Upload Note

During local development, uploaded CV files are stored under:

```text
uploads/cvs/
```

On Vercel, uploads use the temporary `/tmp` filesystem.

For permanent production storage, the CV upload should be moved to a service such as AWS S3, Cloudinary, or Supabase Storage.

## Author

Shaza Elsayed Ismail

GitHub:

```text
https://github.com/ShazaElsayedIsmail11
```