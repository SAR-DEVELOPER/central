# Database Credentials Reference

This file provides a quick reference for database credentials. **Never commit actual `.env` files to version control.**

## Setup

1. Copy the appropriate environment file:
   ```bash
   # For production
   cp .env.example .env

   # For development
   cp .env.development.example .env
   ```

2. Edit `.env` and change the passwords to your own secure passwords.

## Default Credentials (from .env.example files)

### Production Environment

#### PostgreSQL
- **Host**: localhost
- **Port**: 5432
- **Database**: centri_db

**Root User:**
- Username: `postgres`
- Password: `Pr0dP@ssw0rd!2024$Secure` (CHANGE THIS!)

**Application User (Recommended):**
- Username: `centri_app`
- Password: `P0stgr3sApp!2024$Secure` (CHANGE THIS!)
- Privileges: Limited to necessary operations only

**Connection String:**
```
postgresql://centri_app:P0stgr3sApp!2024$Secure@localhost:5432/centri_db
```

#### MongoDB
- **Host**: localhost
- **Port**: 27017
- **Database**: centri_db
- **Auth Database**: admin

**Root User:**
- Username: `admin`
- Password: `M0ng0Pr0d!2024$Secure` (CHANGE THIS!)

**Application User (Recommended):**
- Username: `centri_app`
- Password: `M0ng0App!2024$Secure` (CHANGE THIS!)
- Roles: readWrite, dbAdmin on centri_db

**Connection String (Root):**
```
mongodb://admin:M0ng0Pr0d!2024$Secure@localhost:27017/centri_db?authSource=admin
```

**Connection String (App User):**
```
mongodb://centri_app:M0ng0App!2024$Secure@localhost:27017/centri_db?authSource=centri_db
```

---

### Development Environment

#### PostgreSQL
- **Host**: localhost
- **Port**: 5432
- **Database**: centri_db_dev

**Root User:**
- Username: `postgres`
- Password: `dev_postgres_password`

**Application User:**
- Username: `centri_app`
- Password: `dev_postgres_app_password`

**Connection String:**
```
postgresql://centri_app:dev_postgres_app_password@localhost:5432/centri_db_dev
```

#### MongoDB
- **Host**: localhost
- **Port**: 27017
- **Database**: centri_db_dev
- **Auth Database**: admin

**Root User:**
- Username: `admin`
- Password: `dev_mongo_password`

**Application User:**
- Username: `centri_app`
- Password: `dev_mongo_app_password`

**Connection String (Root):**
```
mongodb://admin:dev_mongo_password@localhost:27017/centri_db_dev?authSource=admin
```

**Connection String (App User):**
```
mongodb://centri_app:dev_mongo_app_password@localhost:27017/centri_db_dev?authSource=centri_db_dev
```

---

## Connecting from Applications

### NestJS Backend (Already Configured)

The backend automatically reads from environment variables:
- `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE` for PostgreSQL
- `MONGODB_URI` for MongoDB

These are set in `docker-compose.yml` and read from your `.env` file.

### Local Database Tools

#### pgAdmin
1. Open pgAdmin
2. Right-click "Servers" → Create → Server
3. General tab: Name = "Centri Local"
4. Connection tab:
   - Host: localhost
   - Port: 5432
   - Database: centri_db (or centri_db_dev)
   - Username: centri_app
   - Password: (from .env file)

#### MongoDB Compass
1. Open MongoDB Compass
2. Click "New Connection"
3. Paste connection string from above
4. Or fill in manually:
   - Hostname: localhost
   - Port: 27017
   - Authentication: Username/Password
   - Username: centri_app
   - Password: (from .env file)
   - Authentication Database: centri_db (or admin for root user)

---

## Security Reminders

1. **Always change default passwords** before deploying to production
2. **Never commit** `.env` files to git (already in .gitignore)
3. **Use application users** (`centri_app`) instead of root users in your code
4. **Rotate passwords regularly** in production environments
5. **Use secrets management** (AWS Secrets Manager, HashiCorp Vault, etc.) in production

---

## Troubleshooting

**Can't connect to database:**
1. Ensure Docker containers are running: `docker-compose ps`
2. Check database health:
   ```bash
   docker-compose exec postgres pg_isready -U postgres
   docker-compose exec mongodb mongosh --eval "db.adminCommand('ping')"
   ```
3. Verify credentials in `.env` match the init scripts
4. Check firewall isn't blocking ports 5432 or 27017

**Forgot password:**
1. Check your `.env` file for current password
2. Or reset by recreating containers:
   ```bash
   docker-compose down -v
   docker-compose up -d
   ```
   (Warning: This deletes all data!)

---

For more details, see [DOCKER.md](DOCKER.md).
