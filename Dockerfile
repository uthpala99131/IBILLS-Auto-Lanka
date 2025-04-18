# Use the latest Node.js image as the base
FROM node:18-bullseye  

# Set the working directory inside the container
WORKDIR /usr/src/app  

# Copy package files first to install dependencies
COPY package.json package-lock.json* ./  

# Install dependencies
RUN npm install  

# Copy the rest of the app files
COPY . .  

# Build the Next.js application
RUN npm run build  

# Expose port 3000 (default for Next.js)
EXPOSE 3000  

# Start the Next.js production server
CMD [ "npm", "start" ]
