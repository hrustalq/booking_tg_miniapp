#!/bin/bash

# Set the project directory
PROJECT_DIR="/usr/apps/booking_tg_miniapp"

# Navigate to the project directory
cd $PROJECT_DIR || exit

# Pull the latest changes from the main branch
git pull origin main

# Build and start the Docker containers
docker-compose up -d --build

# Check if the containers are running
if [ $? -eq 0 ]; then
    echo "Docker containers built and started successfully."
else
    echo "Error starting Docker containers. Please check the logs."
    exit 1
fi

echo "Deployment completed successfully!"