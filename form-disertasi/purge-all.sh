#!/bin/bash

# Hard purge script - deletes all form responses from database
# Usage: ./purge-all.sh
# Or with Docker: docker-compose exec postgres psql -U postgres -d centri_db -c "DELETE FROM form1_responses; DELETE FROM form2_responses; DELETE FROM form3_responses;"

echo "Starting hard purge of all form responses..."

# Try Docker first (if docker-compose is available)
if command -v docker-compose &> /dev/null; then
    echo "Using Docker Compose..."
    docker-compose exec -T postgres psql -U postgres -d centri_db <<EOF
BEGIN;
DELETE FROM form1_responses;
DELETE FROM form2_responses;
DELETE FROM form3_responses;
COMMIT;
SELECT 'Form1 remaining: ' || COUNT(*)::text FROM form1_responses;
SELECT 'Form2 remaining: ' || COUNT(*)::text FROM form2_responses;
SELECT 'Form3 remaining: ' || COUNT(*)::text FROM form3_responses;
EOF
else
    # Fallback to direct psql connection
    echo "Using direct psql connection..."
    DB_NAME=${DB_NAME:-"centri_db"}
    DB_USER=${DB_USER:-"postgres"}
    
    psql -U "$DB_USER" -d "$DB_NAME" <<EOF
BEGIN;
DELETE FROM form1_responses;
DELETE FROM form2_responses;
DELETE FROM form3_responses;
COMMIT;
SELECT 'Form1 remaining: ' || COUNT(*)::text FROM form1_responses;
SELECT 'Form2 remaining: ' || COUNT(*)::text FROM form2_responses;
SELECT 'Form3 remaining: ' || COUNT(*)::text FROM form3_responses;
EOF
fi

echo ""
echo "Purge complete!"

