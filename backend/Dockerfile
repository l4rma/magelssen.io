# Use a lightweight JRE base image
FROM adoptopenjdk:11-jre-hotspot

# Set the working directory to /app
WORKDIR /app

# Copy the Micronaut application JAR file to the container
COPY build/libs/backend-0.1-all.jar app.jar

# Expose the port that your application listens on
EXPOSE 8080

# Set any necessary environment variables (optional)
ENV MY_ENV_VARIABLE=my-value

# Start the Micronaut application when the container starts
CMD ["java", "-jar", "app.jar"]