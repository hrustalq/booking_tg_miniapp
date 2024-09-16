#!/bin/bash

# Set the project directory
PROJECT_DIR="/usr/apps/booking_tg_miniapp"
SITE_NAME="tg-bot"

# Navigate to the project directory
cd $PROJECT_DIR || exit

# Pull the latest changes from the main branch
git pull origin main

# Install or update dependencies
npm install

# Run dev server
npm run dev

# Get the nginx configuration file
NGINX_CONF="$PROJECT_DIR/nginx.conf"

if [ -f "$NGINX_CONF" ]; then
    # Copy the nginx configuration to the appropriate location
    sudo cp "$NGINX_CONF" "/etc/nginx/sites-available/$SITE_NAME"
    
    # Create a symbolic link if it doesn't exist
    if [ ! -L "/etc/nginx/sites-enabled/$SITE_NAME" ]; then
        sudo ln -s "/etc/nginx/sites-available/$SITE_NAME" "/etc/nginx/sites-enabled/"
    fi
    
    # Test nginx configuration
    sudo nginx -t

    # If the test is successful, reload nginx
    if [ $? -eq 0 ]; then
        sudo systemctl reload nginx
        echo "Nginx configuration updated and reloaded successfully."
    else
        echo "Error in Nginx configuration. Please check the nginx.conf file."
        exit 1
    fi
else
    echo "nginx.conf file not found in the project directory."
fi

echo "Deployment completed successfully!"