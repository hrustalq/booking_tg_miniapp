.PHONY: up down build logs ps clean

# Default target
all: up

# Start containers in detached mode
up:
	docker-compose up -d

# Stop and remove containers
down:
	docker-compose down

# Build or rebuild services
build:
	docker-compose build

# View output from containers
logs:
	docker-compose logs -f

# List containers
ps:
	docker-compose ps

# Remove all containers, networks, and volumes
clean:
	docker-compose down -v --remove-orphans

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
