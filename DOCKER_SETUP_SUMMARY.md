# Docker Setup Summary

This document summarizes the Docker infrastructure that has been added to the Central monorepo.

## What Was Added

### 1. Docker Compose Configuration
**File**: `docker-compose.yml`

Four services configured:
- **postgres**: PostgreSQL 16 Alpine
- **mongodb**: MongoDB 7 (Jammy)
- **backend**: NestJS application (centri-backend)
- **frontend**: Next.js application (form-disertasi)

**Features**:
- Health checks for databases
- Persistent volumes for data
- Custom bridge network for inter-service communication
- Multi-profile support (development/production via environment variables)

### 2. Database Initialization Scripts

**PostgreSQL** (`docker/postgres/init/01-init-user.sql`):
- Creates `centri_app` application user with limited privileges
- Grants necessary permissions on `centri_db`
- Enables UUID and pgcrypto extensions

**MongoDB** (`docker/mongodb/init/01-init-user.js`):
- Creates `centri_app` application user
- Assigns `readWrite` and `dbAdmin` roles on `centri_db`
- Creates initial metadata collection

### 3. Environment Configuration

**Files**:
- `.env.example` - Production environment template with secure passwords
- `.env.development.example` - Development environment template with simple passwords
- `.gitignore` - Ensures `.env` files are never committed

**Variables Configured**:
- Node environment settings
- Docker build targets
- Port configurations
- PostgreSQL credentials and connection details
- MongoDB credentials and connection details

### 4. Backend Database Integration

**PostgreSQL (TypeORM)**:
- Installed dependencies: `@nestjs/typeorm`, `typeorm`, `pg`
- Created `src/config/database.config.ts` for TypeORM configuration
- Created `ormconfig.ts` for migrations
- Updated `app.module.ts` to import TypeORM module
- Auto-sync enabled in development mode

**MongoDB (Mongoose)**:
- Installed dependencies: `@nestjs/mongoose`, `mongoose`
- Ready to use but not actively integrated yet
- Connection string configured in docker-compose.yml

### 5. Documentation

**DOCKER.md** - Comprehensive guide including:
- Quick start for production and development
- Environment configuration
- Docker commands (start, stop, rebuild, logs, etc.)
- Architecture overview with all services
- Database management section:
  - Connecting from local tools (pgAdmin, Compass)
  - Database commands (backup, restore, shell access)
  - Migration commands for TypeORM
  - Security best practices
  - Resetting databases
- Troubleshooting section with database-specific issues
- Health checks for all services

**DATABASE_CREDENTIALS.md** - Quick reference for:
- Connection details for PostgreSQL and MongoDB
- Root and application user credentials
- Connection strings for both databases
- How to connect from pgAdmin and MongoDB Compass
- Security reminders

**docker/README.md** - Init scripts documentation:
- How initialization works
- Adding new scripts
- Security considerations
- Troubleshooting init scripts

**CLAUDE.md** - Updated with:
- Docker quick start section
- Database configuration details
- Database access information
- Updated architecture section

## Security Features

1. **Dedicated Application Users**:
   - `centri_app` for PostgreSQL (limited grants)
   - `centri_app` for MongoDB (readWrite + dbAdmin only)

2. **Separate Root and App Credentials**:
   - Root users: `postgres` and `admin`
   - Application users: `centri_app` (both databases)

3. **Different Passwords for Dev/Prod**:
   - Production: Strong, complex passwords
   - Development: Simple passwords for convenience

4. **Environment Variables**:
   - All credentials in `.env` files
   - `.env` files in `.gitignore`
   - Example files committed for reference

5. **Network Isolation**:
   - Databases accessible only via configured ports
   - Internal communication via Docker network
   - Health checks ensure database availability

## Port Configuration

| Service    | Container Port | Host Port       | Configurable Via   |
|------------|----------------|-----------------|-------------------|
| PostgreSQL | 5432           | 5432 (default)  | `POSTGRES_PORT`   |
| MongoDB    | 27017          | 27017 (default) | `MONGODB_PORT`    |
| Backend    | 4000           | 4000 (default)  | `BACKEND_PORT`    |
| Frontend   | 3000           | 3000 (default)  | `FRONTEND_PORT`   |

## Volumes

| Volume Name      | Purpose                    | Persists |
|------------------|----------------------------|----------|
| postgres_data    | PostgreSQL database files  | Yes      |
| mongodb_data     | MongoDB database files     | Yes      |
| mongodb_config   | MongoDB configuration      | Yes      |

## Quick Start

### Production
```bash
cp .env.example .env
docker-compose up -d
docker-compose logs -f
```

### Development
```bash
cp .env.development.example .env
docker-compose up -d
docker-compose logs -f
```

### Access Services
- Frontend: http://localhost:3000
- Backend: http://localhost:4000
- PostgreSQL: localhost:5432 (via pgAdmin/psql)
- MongoDB: localhost:27017 (via Compass/mongosh)

## Database Connections

### PostgreSQL (Application User - Recommended)
```
Host: localhost
Port: 5432
Database: centri_db
Username: centri_app
Password: (see .env file)
```

Connection string:
```
postgresql://centri_app:PASSWORD@localhost:5432/centri_db
```

### MongoDB (Application User - Recommended)
```
Host: localhost
Port: 27017
Database: centri_db
Auth Database: centri_db
Username: centri_app
Password: (see .env file)
```

Connection string:
```
mongodb://centri_app:PASSWORD@localhost:27017/centri_db?authSource=centri_db
```

## Common Commands

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild everything
docker-compose up -d --build

# Access database shells
docker-compose exec postgres psql -U postgres -d centri_db
docker-compose exec mongodb mongosh -u admin --authenticationDatabase admin

# Check health
docker-compose ps
docker-compose exec postgres pg_isready -U postgres
docker-compose exec mongodb mongosh --eval "db.adminCommand('ping')"

# Backup databases
docker-compose exec -T postgres pg_dump -U postgres centri_db > backup.sql
docker-compose exec mongodb mongodump -u admin -p PASSWORD --authenticationDatabase admin --db centri_db --out /tmp/backup

# Reset databases (DELETES ALL DATA!)
docker-compose down -v
docker-compose up -d
```

## File Structure

```
central/
├── docker-compose.yml                 # Orchestration configuration
├── .env.example                       # Production environment template
├── .env.development.example           # Development environment template
├── .gitignore                         # Git ignore rules (includes .env)
├── DOCKER.md                          # Comprehensive Docker guide
├── DATABASE_CREDENTIALS.md            # Database credentials reference
├── DOCKER_SETUP_SUMMARY.md           # This file
├── CLAUDE.md                          # Updated with Docker info
├── docker/
│   ├── README.md                      # Init scripts documentation
│   ├── postgres/
│   │   └── init/
│   │       └── 01-init-user.sql      # PostgreSQL initialization
│   └── mongodb/
│       └── init/
│           └── 01-init-user.js       # MongoDB initialization
├── centri-backend/
│   ├── Dockerfile                     # Backend multi-stage build
│   ├── .dockerignore                  # Docker build exclusions
│   ├── ormconfig.ts                   # TypeORM migrations config
│   ├── package.json                   # Updated with DB dependencies
│   └── src/
│       ├── app.module.ts              # Updated with TypeORM import
│       └── config/
│           └── database.config.ts     # TypeORM configuration
└── form-disertasi/
    ├── Dockerfile                     # Frontend multi-stage build
    └── .dockerignore                  # Docker build exclusions
```

## Next Steps

1. **Create your `.env` file**:
   ```bash
   cp .env.development.example .env
   # Edit .env and change passwords if needed
   ```

2. **Start the stack**:
   ```bash
   docker-compose up -d
   ```

3. **Connect to databases** using pgAdmin and MongoDB Compass:
   - See DATABASE_CREDENTIALS.md for connection details

4. **Create your first entity** in the backend:
   ```bash
   # Inside centri-backend directory
   # Create entities with .entity.ts suffix
   # TypeORM will auto-sync in development mode
   ```

5. **Develop your application**:
   - Backend runs on port 4000
   - Frontend runs on port 3000
   - Hot-reload enabled in development mode

6. **When ready for production**:
   - Copy `.env.example` to `.env`
   - Change all passwords to secure values
   - Set `NODE_ENV=production`
   - Set `BACKEND_TARGET=production` and `FRONTEND_TARGET=production`
   - Run `docker-compose up -d --build`

## Support

For detailed information:
- Docker usage: See [DOCKER.md](DOCKER.md)
- Database credentials: See [DATABASE_CREDENTIALS.md](DATABASE_CREDENTIALS.md)
- Init scripts: See [docker/README.md](docker/README.md)
- Project overview: See [CLAUDE.md](CLAUDE.md)

Happy coding!
