# Base stage
FROM node:20-alpine AS base

WORKDIR /app

# Copy package files
COPY package*.json ./

# Development stage
FROM base AS development

# Install tini for proper signal handling
RUN apk add --no-cache tini

# Install all dependencies (including devDependencies)
RUN npm ci

# Copy source code
COPY . .

# Expose the port
EXPOSE 4000

# Set environment variables
ENV NODE_ENV=development
ENV PORT=4000

# Use tini as entrypoint to handle signals properly
ENTRYPOINT ["/sbin/tini", "--"]

# Start in development mode with watch
CMD ["npm", "run", "start:dev"]

# Build stage
FROM base AS builder

# Install all dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine AS production

# Install tini for proper signal handling
RUN apk add --no-cache tini

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Expose the port
EXPOSE 4000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=4000

# Use tini as entrypoint to handle signals properly
ENTRYPOINT ["/sbin/tini", "--"]

# Start the application
CMD ["node", "dist/src/main"]
