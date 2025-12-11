# frontend/Dockerfile

# Stage 1: build angular app
FROM node:18-alpine AS build

WORKDIR /app

# copy package files first for better caching
COPY package*.json ./
COPY package-lock.json ./

# install Angular CLI and dependencies
RUN npm install -g @angular/cli && npm install

# copy source
COPY . .

# build (change configuration if you use a different name)
RUN npm start --configuration production

# Stage 2: serve with nginx
FROM nginx:alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from builder
# Adjust the dist folder name if your project name differs
COPY --from=build /app/dist/employee-availability-frontend /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
