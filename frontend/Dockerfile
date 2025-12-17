# Stage 1: Build Angular App
FROM node:20 AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install Angular CLI globally + dependencies
RUN npm install -g @angular/cli && npm install

# Copy all source files
COPY . .

# Build Angular using npx (uses local CLI and avoids permission issues)
RUN npx ng build --configuration production

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist/employee-availability-frontend /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]