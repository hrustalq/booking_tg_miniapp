#!/bin/bash

# Update the package database
sudo apt-get update

# Install necessary packages
sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release -y

# Add Docker's official GPG key
sudo mkdir -m 0755 -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo tee /etc/apt/keyrings/docker.gpg > /dev/null

# Set up the Docker repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Update the package database with the new Docker packages
sudo apt-get update

# Install Docker Engine, CLI, and containerd
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y

# Enable Docker service
sudo systemctl enable docker
sudo systemctl start docker

# Allow the current user to run Docker commands without sudo
sudo usermod -aG docker $USER

# Print Docker version to verify installation
docker --version

echo "Docker installation completed!"