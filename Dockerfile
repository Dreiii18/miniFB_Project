# Use a Node.js base image
FROM node:22.11.0-alpine3.19

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies, including dev dependencies
RUN npm install --include=dev

# Add node_modules/.bin to PATH
ENV PATH="./node_modules/.bin:$PATH"

# Copy the rest of your application files
COPY . .

# Expose the port your app listens on
EXPOSE 5001

# Default command (use the dev script for development)
CMD ["npm", "run", "start"]
