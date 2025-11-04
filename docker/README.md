# Docker Database Initialization Scripts

This directory contains initialization scripts for PostgreSQL and MongoDB databases.

## Directory Structure

```
docker/
├── postgres/
│   └── init/
│       └── 01-init-user.sql    # PostgreSQL initialization
└── mongodb/
    └── init/
        └── 01-init-user.js     # MongoDB initialization
```

## How Initialization Works

### PostgreSQL (`postgres/init/`)

Scripts in this directory are executed in alphabetical order when the PostgreSQL container is **first created**. Files are executed by the official PostgreSQL Docker image's entrypoint script.

**Current Scripts:**
- `01-init-user.sql`: Creates the `centri_app` application user with limited privileges
  - Creates user with password
  - Grants necessary permissions on the database
  - Enables UUID and crypto extensions

**Supported File Types:**
- `.sql` - SQL scripts
- `.sql.gz` - Compressed SQL scripts
- `.sh` - Shell scripts

### MongoDB (`mongodb/init/`)

Scripts in this directory are executed in alphabetical order when the MongoDB container is **first created**. The official MongoDB Docker image runs these scripts after the database is initialized.

**Current Scripts:**
- `01-init-user.js`: Creates the `centri_app` application user
  - Switches to the application database
  - Creates user with `readWrite` and `dbAdmin` roles
  - Creates initial collections (optional)

**Supported File Types:**
- `.js` - JavaScript files executed with mongosh
- `.sh` - Shell scripts

## Important Notes

1. **First Run Only**: Init scripts run **only when the container is created for the first time** (when volumes are empty).

2. **Re-running Scripts**: To re-run initialization scripts:
   ```bash
   # Stop containers and remove volumes
   docker-compose down -v

   # Start fresh (will run init scripts again)
   docker-compose up -d
   ```
   **Warning**: This deletes all database data!

3. **Script Order**: Files are executed in alphabetical order, hence the `01-` prefix. Add more scripts with `02-`, `03-`, etc.

4. **Modifying Scripts**: Changes to init scripts only take effect on new containers. Existing containers won't be affected.

## Adding New Initialization Scripts

### PostgreSQL Example

Create `docker/postgres/init/02-create-tables.sql`:

```sql
-- Create example table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Grant privileges to application user
GRANT SELECT, INSERT, UPDATE, DELETE ON users TO centri_app;
GRANT USAGE, SELECT ON SEQUENCE users_id_seq TO centri_app;
```

### MongoDB Example

Create `docker/mongodb/init/02-seed-data.js`:

```javascript
// Switch to application database
db = db.getSiblingDB('centri_db');

// Insert seed data
db.users.insertMany([
    {
        email: 'admin@example.com',
        role: 'admin',
        createdAt: new Date()
    },
    {
        email: 'user@example.com',
        role: 'user',
        createdAt: new Date()
    }
]);

print('Seed data inserted successfully');
```

## Security Considerations

1. **Passwords in Scripts**: The current init scripts contain hardcoded passwords matching the `.env.example` files. For production:
   - Change passwords in both init scripts and `.env` file
   - Or use environment variables in init scripts (more complex)

2. **Principle of Least Privilege**:
   - Application users (`centri_app`) have minimal necessary permissions
   - Use these users in your application, not root users
   - PostgreSQL: `centri_app` can't create databases or users
   - MongoDB: `centri_app` limited to `centri_db` only

3. **Version Control**: These scripts are committed to git. Don't put sensitive production data in init scripts.

## Troubleshooting

**Scripts didn't run:**
1. Check container logs:
   ```bash
   docker-compose logs postgres
   docker-compose logs mongodb
   ```

2. Verify scripts have correct permissions:
   ```bash
   ls -la docker/postgres/init/
   ls -la docker/mongodb/init/
   ```

3. Check script syntax:
   ```bash
   # PostgreSQL
   docker-compose exec postgres psql -U postgres -f /docker-entrypoint-initdb.d/01-init-user.sql

   # MongoDB
   docker-compose exec mongodb mongosh --file /docker-entrypoint-initdb.d/01-init-user.js
   ```

**User already exists error:**
The scripts have checks to prevent errors if users already exist. If you see errors, it's usually because:
- Volumes weren't deleted before recreating
- Scripts ran multiple times somehow

**Need to update user permissions:**
After modifying init scripts, you must recreate the database:
```bash
docker-compose down -v  # Deletes data!
docker-compose up -d
```

Or manually update permissions:
```bash
# PostgreSQL
docker-compose exec postgres psql -U postgres -d centri_db -c "GRANT UPDATE ON some_table TO centri_app;"

# MongoDB
docker-compose exec mongodb mongosh -u admin --authenticationDatabase admin centri_db --eval "db.grantRolesToUser('centri_app', [{role: 'readWrite', db: 'centri_db'}])"
```

## Best Practices

1. **Idempotent Scripts**: Write scripts that can run multiple times safely (use `IF NOT EXISTS`, `CREATE OR REPLACE`, etc.)

2. **Logging**: Add `RAISE NOTICE` (PostgreSQL) or `print()` (MongoDB) statements for debugging

3. **Error Handling**: Use try-catch blocks (MongoDB) or proper error handling

4. **Documentation**: Comment your scripts explaining what they do

5. **Testing**: Test init scripts in development before deploying to production

## References

- [PostgreSQL Docker Official Image](https://hub.docker.com/_/postgres)
- [MongoDB Docker Official Image](https://hub.docker.com/_/mongo)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
