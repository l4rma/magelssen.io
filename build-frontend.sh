#!/bin/bash
#
# author: Lars Magelssen
# date: 2023-03-15
# 
# Build frontend and copy it to servers static dir

echo "Running build-website shell script.."
sleep 1

# Building frontend
cd frontend
echo "Building frontend.."
sleep 1
npm run build
echo "Copying to static dir"
cp -r build/* ../backend/src/main/resources/static/

# Building backend
cd ../backend
echo "Building backend.."
sleep 1
./gradlew build
cd ..
