# Start from the official Bun image
FROM oven/bun:latest as build

WORKDIR /app

# Copy only package files first (for build caching)
COPY package*.json ./
COPY svelte.config.js ./
COPY vite.config.* ./

# Install dependencies using Bun
RUN bun install

# Copy the rest of the source code
COPY . .

# Build the SvelteKit app
RUN bun run build

# The final, minimal production image
FROM oven/bun:latest

WORKDIR /app

# Copy the build output and necessary files from the builder stage
COPY --from=build /app/build ./build
COPY package*.json ./
COPY svelte.config.js ./
COPY vite.config.* ./

# Install only production dependencies
RUN bun install --production

# Expose the port your SvelteKit app runs on (default: 3000)
EXPOSE 3000

# Run the server using Bun's node-compatible environment
CMD ["bun", "node", "build"]
