# Use Node.js 18.17.0-alpine as the base image
FROM node:18.17.0-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

RUN npm config set fetch-retry-mintimeout 60000

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port Next.js runs on
EXPOSE 3000

# Start the Next.js app in development mode
CMD ["npm", "run", "dev"]
