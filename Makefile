.PHONY: up down build logs ps clean

# Default target
all: up

# Start containers in detached mode
up:
	docker-compose -f docker-compose.yml up -d

# Stop and remove containers
down:
	docker-compose -f docker-compose.yml down

# Build or rebuild services
build:
	docker-compose -f docker-compose.yml build

# View output from containers
logs:
	docker-compose -f docker-compose.yml logs -f

# List containers
ps:
	docker-compose -f docker-compose.yml ps

# Remove all containers, networks, and volumes
clean:
	docker-compose -f docker-compose.yml down -v --remove-orphans

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
