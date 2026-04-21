FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY . .

RUN chmod +x gradlew


RUN ./gradlew clean build -x test

CMD ["sh", "-c", "java -jar $(ls build/libs/*.jar | head -n 1)"]
