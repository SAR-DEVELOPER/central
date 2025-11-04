# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a monorepo containing two separate applications:

1. **centri-backend**: A NestJS backend application (REST API)
2. **form-disertasi**: A Next.js frontend application for dissertation survey forms

## Docker Quick Start

**Recommended approach for running the entire stack:**

```bash
# Copy environment file (choose production or development)
cp .env.example .env                    # For production
# OR
cp .env.development.example .env        # For development

# Start all services (backend, frontend, PostgreSQL, MongoDB)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

See [DOCKER.md](DOCKER.md) for comprehensive Docker documentation.

## Commands

### Backend (centri-backend)

Navigate to the `centri-backend` directory before running these commands:

```bash
cd centri-backend
```

**Development:**
```bash
npm run start:dev      # Run in watch mode
npm run start:debug    # Run with debugging enabled
```

**Build & Production:**
```bash
npm run build          # Build the application
npm run start:prod     # Run production build
```

**Testing:**
```bash
npm run test           # Run unit tests
npm run test:watch     # Run tests in watch mode
npm run test:cov       # Run tests with coverage
npm run test:e2e       # Run end-to-end tests
```

**Code Quality:**
```bash
npm run lint           # Lint and auto-fix TypeScript files
npm run format         # Format code with Prettier
```

### Frontend (form-disertasi)

Navigate to the `form-disertasi` directory before running these commands:

```bash
cd form-disertasi
```

**Development:**
```bash
npm run dev            # Start development server (localhost:3000)
```

**Build & Production:**
```bash
npm run build          # Build for production
npm run start          # Start production server
```

**Code Quality:**
```bash
npm run lint           # Run ESLint
```

## Architecture

### Backend (centri-backend)

- **Framework**: NestJS 11.x with TypeScript
- **Database**:
  - PostgreSQL with TypeORM (for relational data and metadata)
  - MongoDB with Mongoose (for embedded and heavy documents, ready but not actively used yet)
- **Structure**: Standard NestJS architecture
  - `src/main.ts`: Application entry point (runs on port 4000 in Docker)
  - `src/app.module.ts`: Root module with TypeORM integration
  - `src/app.controller.ts`: Root controller
  - `src/app.service.ts`: Root service
  - `src/config/database.config.ts`: TypeORM database configuration
  - `ormconfig.ts`: TypeORM migration configuration
- **Testing**: Jest for unit tests, E2E tests in `test/` directory
- **Port**: 4000 (when running in Docker), 3000 (when running locally)

**Database Configuration:**
- PostgreSQL is configured and integrated via TypeORM
- MongoDB is available but not yet integrated into the application logic
- Database entities should be created in respective module directories with `.entity.ts` suffix
- In development mode, TypeORM auto-syncs the schema (synchronize: true)

### Frontend (form-disertasi)

- **Framework**: Next.js 16.x with App Router and React 19.x
- **Styling**: Tailwind CSS v4 with custom configuration
- **Structure**:
  - `app/page.tsx`: Landing page ("Central Hub")
  - `app/form1/page.tsx`: Dissertation survey form for Audit Committee interactions with External Auditors (KAP) and Internal Auditors (SPI)
  - `app/form2/page.tsx`: Second survey form
  - `app/form3/page.tsx`: Third survey form
  - `app/layout.tsx`: Root layout with Geist fonts

**Survey Forms Architecture:**
The dissertation survey forms (`form1`, `form2`, `form3`) are client-side React components with:
- Likert scale questions (6-point scale: SS, S, AS, ATS, TS, STS)
- Respondent identity collection (name, company, position, gender, age, education)
- Multiple sections grouping related questions
- Responsive design with both table and mobile card layouts
- Currently logs to console (not connected to backend API)

**Form Data Flow:**
Survey forms currently handle submission client-side only. When integrating with the backend:
- Forms submit to `/api/survey` endpoint (needs implementation)
- Payload includes: identity object, answers object (question ID → Likert choice), openEnded object, timestamp

## Project Context

- **Owner**: Wilson Nathanael / DiluarPersegi
- **Purpose**: Central hub for miscellaneous resources and dissertation survey forms
- **Current State**:
  - Backend: Configured with PostgreSQL (TypeORM) and MongoDB (Mongoose available)
  - Frontend: Survey forms implemented, no API integration yet
  - Docker: Full stack containerized with databases

## Development Notes

- **Docker Setup**: All services (backend, frontend, PostgreSQL, MongoDB) can be run via Docker Compose
- **Database Strategy**:
  - PostgreSQL for relational data and metadata
  - MongoDB for embedded and heavy documents (future use)
  - MinIO planned for actual document storage
- **Backend-Frontend**: Currently independent, integration pending
- **Security**: Dedicated database users (`centri_app`) created with limited privileges
- Survey forms are in Indonesian language and focus on audit committee interactions
- Forms are fully client-side with no backend integration currently implemented

## Database Access

When running via Docker, databases are accessible:
- **PostgreSQL**: `localhost:5432`
  - User: `centri_app` / Password: See `.env` file
  - Connect using pgAdmin or any PostgreSQL client
- **MongoDB**: `localhost:27017`
  - User: `centri_app` / Password: See `.env` file
  - Connect using MongoDB Compass or any MongoDB client

See [DOCKER.md](DOCKER.md) for detailed connection instructions and database management commands.
