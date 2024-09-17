# Use an official Node runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Install Turbo globally
RUN npm install -g turbo
RUN npm install -g @nestjs/cli

# Copy package.json and package-lock.json (if available)
COPY package*.json ./
COPY turbo.json ./

COPY /apps/api/package*.json ./apps/api/
COPY /apps/web/package*.json ./apps/web/

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3030 5173

# Run the app in dev mode
CMD ["npm", "run", "dev"]