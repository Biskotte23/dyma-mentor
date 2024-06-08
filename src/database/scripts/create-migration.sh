#!/bin/bash

set -e

generation_name=$1

export $(grep -v '^#' .env | xargs)

npm run build

output=$(npm run typeorm -- migration:create $MIGRATION_FOLDER_PATH/$generation_name)

filename=$(echo "$output" | grep -oP "Migration .+/\K[^ ]+")

if [ -n "$filename" ]; then
  fullpath="$MIGRATION_FOLDER_PATH/$filename"
  echo "Migration file created: $fullpath"
else
  echo "Migration file creation has failed"
fi