FROM node:18-alpine AS base

# Development stage
FROM base AS development
RUN apk update && apk add --no-cache libc6-compat
WORKDIR /app

# Install Turbo globally
RUN npm install -g turbo

# Copy package.json
COPY package*.json ./

# Install app dependencies
COPY apps/web/package*.json ./apps/web/package.json

# Install dependencies
RUN npm install

# Copy source code
COPY apps/web/ .

# Expose port for development server
EXPOSE 8080

# Start development server
CMD ["npm", "run", "dev"]