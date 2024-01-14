FROM gradle:8.5.0-jdk17-alpine as build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle build --no-daemon -x test

FROM eclipse-temurin:17-jdk-jammy

WORKDIR /app

COPY --from=build /home/gradle/src/build/libs/*.jar /app/laundry-backend.jar
ENTRYPOINT ["java","-jar","/app/laundry-backend.jar"]
