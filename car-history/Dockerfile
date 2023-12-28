FROM maven:3.6.0-jdk-11-slim AS build
COPY src /home/app/src
COPY pom.xml /home/app
RUN mvn -f /home/app/pom.xml clean package

FROM openjdk:19
COPY car-history-0.0.1.jar .
EXPOSE 8080
CMD java -jar car-history-0.0.1.jar
