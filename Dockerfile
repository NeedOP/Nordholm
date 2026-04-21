# Use Java 17 (Spring Boot compatible)
FROM eclipse-temurin:17-jdk

# Set working directory
WORKDIR /app

# Copy everything
COPY . .

# Give permission to gradlew
RUN chmod +x gradlew

# Build the project
RUN ./gradlew build

# Run the app
CMD ["java", "-jar", "build/libs/*.jar"]
