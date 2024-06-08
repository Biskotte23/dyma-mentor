#!/bin/bash

set -e

generation_name=$1

export $(grep -v '^#' .env | xargs)

npm run build

output=$(npm run typeorm -- migration:generate -d ./dist/db/database-config.js $MIGRATION_FOLDER_PATH/$generation_name)

filename=$(echo "$output" | grep -oP "Migration .+/\K[^ ]+")

if [ -n "$filename" ]; then
  fullpath="$MIGRATION_FOLDER_PATH/$filename"
  npx eslint $fullpath --fix
  echo "Migration generated: $fullpath"
else
  echo "Migration has failed"
fi
