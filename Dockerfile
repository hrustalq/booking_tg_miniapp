# Base image for Node.js
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose ports for both applications
EXPOSE 5173 3000

# Install global dependencies
RUN npm install -g @nestjs/cli vite

# Set up environment for development
ENV NODE_ENV=development

# Start both applications in development mode
CMD ["sh", "-c", "cd apps/web && npm run dev & cd apps/api && npm run start:dev"]
