// MongoDB Initialization Script
// This script creates a dedicated application user with appropriate roles
// for better security practices

// Switch to the application database
db = db.getSiblingDB('centri_db');

// Create application user if it doesn't exist
// Note: In production, change this password
try {
    db.createUser({
        user: 'centri_app',
        pwd: 'M0ng0App!2024$Secure',
        roles: [
            {
                role: 'readWrite',
                db: 'centri_db'
            },
            {
                role: 'dbAdmin',
                db: 'centri_db'
            }
        ]
    });

    print('MongoDB initialization completed successfully');
    print('Database: centri_db');
    print('Application user: centri_app created with readWrite and dbAdmin roles');

} catch (error) {
    if (error.code === 51003) {
        print('User centri_app already exists, skipping creation');
    } else {
        print('Error creating user: ' + error);
        throw error;
    }
}

// Create initial collections (optional, will be created automatically when first used)
db.createCollection('metadata');
print('Initial collection "metadata" created');
