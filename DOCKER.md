# Docker Setup Guide

This guide explains how to run both the backend and frontend applications using Docker and Docker Compose.

## Prerequisites

- Docker (version 20.10 or higher)
- Docker Compose (version 2.0 or higher)

## Quick Start

### Production Mode

Run both applications in production mode:

```bash
# Copy the environment file
cp .env.example .env

# Build and start the containers
docker-compose up -d

# View logs
docker-compose logs -f
```

The applications will be available at:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:4000
- **PostgreSQL**: localhost:5432
- **MongoDB**: localhost:27017

### Development Mode

Run both applications in development mode with hot-reload:

```bash
# Copy the development environment file
cp .env.development.example .env

# Build and start the containers
docker-compose up -d

# View logs
docker-compose logs -f
```

## Environment Configuration

### Environment Variables

Create a `.env` file in the root directory to configure the applications:

```env
# Environment Mode (development or production)
NODE_ENV=production

# Docker Build Targets
BACKEND_TARGET=production
FRONTEND_TARGET=production

# Port Configuration
BACKEND_PORT=4000
FRONTEND_PORT=3000

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### Development vs Production

The main differences between development and production modes:

**Development Mode:**
- Hot-reload enabled (source code changes automatically refresh)
- Source code mounted as volumes
- Includes all devDependencies
- Backend runs with `npm run start:dev`
- Frontend runs with `npm run dev`

**Production Mode:**
- Optimized builds
- Smaller image sizes
- Only production dependencies included
- Backend runs compiled JavaScript
- Frontend runs optimized Next.js build

## Docker Commands

### Starting Services

```bash
# Start in detached mode
docker-compose up -d

# Start and view logs
docker-compose up

# Start specific service only
docker-compose up backend
docker-compose up frontend
```

### Stopping Services

```bash
# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Stop specific service
docker-compose stop backend
docker-compose stop frontend
```

### Rebuilding

```bash
# Rebuild all images
docker-compose build

# Rebuild without cache
docker-compose build --no-cache

# Rebuild specific service
docker-compose build backend
docker-compose build frontend

# Rebuild and restart
docker-compose up -d --build
```

### Viewing Logs

```bash
# View all logs
docker-compose logs

# Follow logs (live)
docker-compose logs -f

# View specific service logs
docker-compose logs backend
docker-compose logs frontend

# View last N lines
docker-compose logs --tail=100
```

### Executing Commands in Containers

```bash
# Access backend shell
docker-compose exec backend sh

# Access frontend shell
docker-compose exec frontend sh

# Run npm commands in backend
docker-compose exec backend npm run test

# Run npm commands in frontend
docker-compose exec frontend npm run lint
```

## Architecture

### Services

1. **postgres** (PostgreSQL Database)
   - PostgreSQL 16 Alpine
   - Runs on port 5432
   - Persistent volume: `postgres_data`
   - Default database: `centri_db`

2. **mongodb** (MongoDB Database)
   - MongoDB 7 (Jammy)
   - Runs on port 27017
   - Persistent volumes: `mongodb_data`, `mongodb_config`
   - Default database: `centri_db`

3. **backend** (centri-backend)
   - NestJS application with TypeORM (PostgreSQL) and Mongoose (MongoDB)
   - Runs on port 4000
   - Built with Node.js 20 Alpine
   - Waits for databases to be healthy before starting

4. **frontend** (form-disertasi)
   - Next.js application
   - Runs on port 3000
   - Built with Node.js 20 Alpine

### Network

All services are connected via a custom bridge network (`app-network`), allowing them to communicate using service names:
- Frontend can reach backend at `http://backend:4000`
- Backend can reach PostgreSQL at `postgres:5432`
- Backend can reach MongoDB at `mongodb:27017`
- External access via configured ports

### Volumes

**Persistent Data Volumes:**
- `postgres_data`: PostgreSQL database files (survives container restarts)
- `mongodb_data`: MongoDB database files (survives container restarts)
- `mongodb_config`: MongoDB configuration files

**Development Mode Volumes:**
- Source code directories for hot-reload
- `node_modules` to persist dependencies
- `.next` (frontend) for Next.js cache

## Troubleshooting

### Port Already in Use

If you get port conflicts, change the ports in `.env`:

```env
BACKEND_PORT=4001
FRONTEND_PORT=3001
```

### Container Won't Start

Check logs for errors:

```bash
docker-compose logs backend
docker-compose logs frontend
```

### Permission Issues

If you encounter permission issues with mounted volumes:

```bash
# On Linux/Mac, ensure proper ownership
sudo chown -R $USER:$USER .
```

### Rebuild from Scratch

If you encounter persistent issues:

```bash
# Stop and remove everything
docker-compose down -v

# Remove all images
docker-compose rm -f

# Rebuild without cache
docker-compose build --no-cache

# Start fresh
docker-compose up -d
```

### Development Mode Not Hot-Reloading

Ensure you're using development target in `.env`:

```env
BACKEND_TARGET=development
FRONTEND_TARGET=development
```

Then rebuild:

```bash
docker-compose up -d --build
```

### Database Connection Errors

**Backend can't connect to database:**

1. Check if databases are healthy:
   ```bash
   docker-compose ps
   ```
   Both postgres and mongodb should show "healthy" status.

2. Check database logs:
   ```bash
   docker-compose logs postgres
   docker-compose logs mongodb
   ```

3. Verify environment variables in `.env` match the database credentials.

4. Ensure backend started after databases:
   ```bash
   docker-compose up -d postgres mongodb
   # Wait a few seconds
   docker-compose up -d backend
   ```

**Can't connect from local tools (pgAdmin, Compass):**

1. Ensure databases are running:
   ```bash
   docker-compose ps postgres mongodb
   ```

2. Check if ports are exposed correctly:
   ```bash
   docker-compose ps
   ```
   Should show `0.0.0.0:5432->5432` for PostgreSQL and `0.0.0.0:27017->27017` for MongoDB.

3. Verify firewall isn't blocking the ports.

4. Try connecting with root credentials first, then application user.

**Database won't start:**

1. Check for port conflicts:
   ```bash
   # Check if port is already in use
   lsof -i :5432  # PostgreSQL
   lsof -i :27017 # MongoDB
   ```

2. Check volume permissions:
   ```bash
   docker-compose logs postgres
   docker-compose logs mongodb
   ```

3. Remove and recreate volumes if corrupted:
   ```bash
   docker-compose down -v
   docker-compose up -d
   ```

## Production Deployment

For production deployment:

1. Set production environment variables
2. Build optimized images
3. Use production target

```bash
# Create production .env
cp .env.example .env

# Edit .env to set production values
# NODE_ENV=production
# BACKEND_TARGET=production
# FRONTEND_TARGET=production

# Build and start
docker-compose up -d --build
```

## Database Management

### Connecting to Databases from Local Tools

#### PostgreSQL (pgAdmin, DBeaver, etc.)

**Connection Details:**
```
Host: localhost
Port: 5432
Database: centri_db (production) or centri_db_dev (development)
Username: postgres (root) or centri_app (application user)
Password: See .env file
```

**Using Application User (Recommended):**
```
Username: centri_app
Password: P0stgr3sApp!2024$Secure (production) or dev_postgres_app_password (development)
```

**Connection String:**
```
postgresql://centri_app:P0stgr3sApp!2024$Secure@localhost:5432/centri_db
```

#### MongoDB (Compass, Studio 3T, etc.)

**Connection Details:**
```
Host: localhost
Port: 27017
Database: centri_db (production) or centri_db_dev (development)
Authentication Database: admin
Username: admin (root) or centri_app (application user)
Password: See .env file
```

**Using Application User (Recommended):**
```
Username: centri_app
Password: M0ng0App!2024$Secure (production) or dev_mongo_app_password (development)
```

**Connection String (Root User):**
```
mongodb://admin:M0ng0Pr0d!2024$Secure@localhost:27017/centri_db?authSource=admin
```

**Connection String (Application User):**
```
mongodb://centri_app:M0ng0App!2024$Secure@localhost:27017/centri_db?authSource=centri_db
```

### Database Commands

#### PostgreSQL Commands

```bash
# Access PostgreSQL shell
docker-compose exec postgres psql -U postgres -d centri_db

# Run SQL file
docker-compose exec -T postgres psql -U postgres -d centri_db < backup.sql

# Create database backup
docker-compose exec -T postgres pg_dump -U postgres centri_db > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore database backup
docker-compose exec -T postgres psql -U postgres -d centri_db < backup.sql

# List all databases
docker-compose exec postgres psql -U postgres -c "\l"

# List all tables
docker-compose exec postgres psql -U postgres -d centri_db -c "\dt"

# Check database size
docker-compose exec postgres psql -U postgres -d centri_db -c "SELECT pg_size_pretty(pg_database_size('centri_db'));"
```

#### MongoDB Commands

```bash
# Access MongoDB shell
docker-compose exec mongodb mongosh -u admin -p <password> --authenticationDatabase admin

# Create database backup
docker-compose exec mongodb mongodump -u admin -p <password> --authenticationDatabase admin --db centri_db --out /tmp/backup
docker cp centri-mongodb:/tmp/backup ./mongo_backup_$(date +%Y%m%d_%H%M%S)

# Restore database backup
docker cp ./mongo_backup centri-mongodb:/tmp/restore
docker-compose exec mongodb mongorestore -u admin -p <password> --authenticationDatabase admin --db centri_db /tmp/restore/centri_db

# List all databases
docker-compose exec mongodb mongosh -u admin -p <password> --authenticationDatabase admin --eval "show dbs"

# List all collections
docker-compose exec mongodb mongosh -u admin -p <password> --authenticationDatabase admin centri_db --eval "show collections"

# Check database stats
docker-compose exec mongodb mongosh -u admin -p <password> --authenticationDatabase admin centri_db --eval "db.stats()"
```

### Database Migrations (PostgreSQL with TypeORM)

```bash
# Generate a new migration
docker-compose exec backend npm run typeorm migration:generate -- -n MigrationName

# Run migrations
docker-compose exec backend npm run typeorm migration:run

# Revert last migration
docker-compose exec backend npm run typeorm migration:revert

# Show migration status
docker-compose exec backend npm run typeorm migration:show
```

### Database Security Best Practices

1. **Change Default Passwords**
   - Never use the example passwords in production
   - Use strong, randomly generated passwords
   - Store passwords securely (use secrets management)

2. **Use Application Users**
   - Connect using `centri_app` user, not root users
   - Application users have limited privileges
   - PostgreSQL: `centri_app` has only necessary grants
   - MongoDB: `centri_app` has `readWrite` + `dbAdmin` roles

3. **Rotate Credentials Regularly**
   ```bash
   # PostgreSQL - Change password
   docker-compose exec postgres psql -U postgres -c "ALTER USER centri_app WITH PASSWORD 'new_secure_password';"

   # MongoDB - Change password
   docker-compose exec mongodb mongosh -u admin -p <password> --authenticationDatabase admin --eval "db.getSiblingDB('centri_db').updateUser('centri_app', {pwd: 'new_secure_password'})"
   ```

4. **Backup Regularly**
   - Automate daily backups
   - Store backups securely offsite
   - Test restoration procedures

5. **Network Security**
   - In production, don't expose database ports publicly
   - Use Docker networks for internal communication
   - Enable SSL/TLS for database connections

### Resetting Databases

**Warning: This will delete all data!**

```bash
# Stop all services
docker-compose down

# Remove database volumes (deletes all data)
docker volume rm central_postgres_data
docker volume rm central_mongodb_data
docker volume rm central_mongodb_config

# Start fresh
docker-compose up -d
```

## Health Checks

Check if services are running:

```bash
# View container status
docker-compose ps

# Check backend health
curl http://localhost:4000

# Check frontend health
curl http://localhost:3000

# Check PostgreSQL health
docker-compose exec postgres pg_isready -U postgres

# Check MongoDB health
docker-compose exec mongodb mongosh --eval "db.adminCommand('ping')"
```

## Useful Commands Summary

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild
docker-compose up -d --build

# Access shell
docker-compose exec backend sh
docker-compose exec frontend sh
docker-compose exec postgres psql -U postgres -d centri_db
docker-compose exec mongodb mongosh -u admin --authenticationDatabase admin

# View status
docker-compose ps

# Database backups
docker-compose exec -T postgres pg_dump -U postgres centri_db > backup.sql
docker-compose exec mongodb mongodump -u admin -p <password> --authenticationDatabase admin --db centri_db --out /tmp/backup

# Check database health
docker-compose exec postgres pg_isready -U postgres
docker-compose exec mongodb mongosh --eval "db.adminCommand('ping')"
```

## Important Notes

1. **Security**: Always change default passwords before deploying to production. Never commit `.env` files to version control.

2. **Data Persistence**: Database data persists in Docker volumes. Use `docker-compose down -v` to remove volumes and delete all data.

3. **Initialization**: Database init scripts run only on first container creation. To re-run, delete volumes and recreate containers.

4. **Application Users**: The init scripts create dedicated application users (`centri_app`) with limited privileges for better security.

5. **Environment Variables**: Copy `.env.example` or `.env.development.example` to `.env` and customize as needed.
