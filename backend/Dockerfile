# === Stage 1: Build stage ===
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copy ONLY backend directory
COPY backend/pom.xml .
COPY backend/src ./src

RUN mvn clean package -DskipTests

# === Stage 2: Runtime stage ===
FROM eclipse-temurin:17-jdk
WORKDIR /app

# Copy built JAR
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
