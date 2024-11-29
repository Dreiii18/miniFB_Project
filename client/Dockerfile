# Use a Node.js base image
FROM node:22.11.0-alpine3.19

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose port 3000
EXPOSE 3000

# Default command to start the Vite development server
CMD ["npm", "run", "dev"]
