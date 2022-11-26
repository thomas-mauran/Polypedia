#!/usr/bin/bash
echo "Building the postgres db docker image"
docker build -t db-image ./database
