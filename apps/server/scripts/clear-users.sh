#!/bin/bash
# This script deletes all data from the users table in your SQLite database

DB_PATH="apps/server/database.db"

sqlite3 "$DB_PATH" <<EOF
DELETE FROM users;
EOF

echo "All users deleted from the users table."
