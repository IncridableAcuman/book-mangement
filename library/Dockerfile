# Multi-stage Dockerfile for Spring Boot Backend
FROM gradle:8.12-jdk21-alpine AS builder
WORKDIR /app

# Gradle fayllarini nusxalash va keshdan foydalanish
COPY build.gradle settings.gradle /app/
COPY gradle /app/gradle
COPY gradlew /app/

# Manba kodini nusxalash
COPY src /app/src

# Ilovani yig'ish (testlar build bosqichida o'tkazib yuboriladi yoki alohida tekshiriladi)
RUN ./gradlew bootJar -x test --no-daemon

# Runtime bosqichi
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Foydalanuvchi xavfsizligi
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Yig'ilgan jar faylni ko'chirish
COPY --from=builder /app/build/libs/*.jar app.jar

ENV PORT=8080
ENV JAVA_OPTS="-Xms256m -Xmx512m -XX:+UseG1GC"

EXPOSE 8080

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
