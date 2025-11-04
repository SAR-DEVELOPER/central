# Base stage
FROM node:20-alpine AS base

WORKDIR /app

# Copy package files
COPY package*.json ./

# Development stage
FROM base AS development

# Install all dependencies
RUN npm ci

# Copy source code
COPY . .

# Expose the port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=development

# Start in development mode
CMD ["npm", "run", "dev"]

# Dependencies stage
FROM base AS deps

# Install all dependencies
RUN npm ci

# Builder stage
FROM base AS builder

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built application and necessary files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
