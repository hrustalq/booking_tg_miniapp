# Define the project root directory and docker-compose file
ROOT_DIR := $(shell pwd)
COMPOSE_FILE := docker-compose.yml

.PHONY: up down build logs ps clean help

# Default target
all: up

# Start containers in detached mode
up:
	docker compose -f $(COMPOSE_FILE) up -d

# Stop and remove containers
down:
	docker compose -f $(COMPOSE_FILE) down

# Build or rebuild services
build:
	docker compose -f $(COMPOSE_FILE) build

# View output from containers
logs:
	docker compose -f $(COMPOSE_FILE) logs -f

# List containers
ps:
	docker compose -f $(COMPOSE_FILE) ps

# Remove all containers, networks, and volumes
clean:
	docker compose -f $(COMPOSE_FILE) down -v --remove-orphans

# Help target
help:
	@echo "Available targets:"
	@echo "  up     - Start containers in detached mode"
	@echo "  down   - Stop and remove containers"
	@echo "  build  - Build or rebuild services"
	@echo "  logs   - View output from containers"
	@echo "  ps     - List containers"
	@echo "  clean  - Remove all containers, networks, and volumes"
	@echo "  help   - Show this help message"