#!/bin/bash
# This script inserts dummy data into the users table of your SQLite database

DB_PATH="apps/server/database.db"
sqlite3 "$DB_PATH" <<EOF
INSERT INTO users (github_id, points, created_at, updated_at) VALUES ('alice-gh', 120, strftime('%s','now'), strftime('%s','now'));
INSERT INTO users (github_id, points, created_at, updated_at) VALUES ('bob-dev', 95, strftime('%s','now'), strftime('%s','now'));
INSERT INTO users (github_id, points, created_at, updated_at) VALUES ('charlie-codes', 150, strftime('%s','now'), strftime('%s','now'));
INSERT INTO users (github_id, points, created_at, updated_at) VALUES ('diana42', 80, strftime('%s','now'), strftime('%s','now'));
INSERT INTO users (github_id, points, created_at, updated_at) VALUES ('eve-hacker', 60, strftime('%s','now'), strftime('%s','now'));
EOF

echo "Dummy users inserted into the users table."
