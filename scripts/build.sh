#!/bin/bash

check_errcode() {
    status=$?

    if [ $status -ne 0 ]; then
        echo "${1}"
        exit $status
    fi
}

echo "Checking for missing dependencies before build..."

# Check if node_modules exists, if not throw an error
if [ ! -d "./node_modules" ] || [ ! -d "./react-src/node_modules" ]; then
    echo "node_modules are missing! running install script..."
    npm run install:all
    echo "Installed all missing dependencies! starting installation..."
else
    echo "All dependencies are installed! Ready to run build!"
fi

# This script compiles typescript and React application and puts them into a single NodeJS project
ENV=${NODE_ENV:-production}
echo -e "\n-- Started build script for React & NodeJS (environment $ENV) --"
echo "Removing dist directory..."
rm -rf dist

echo "Compiling typescript..."
./node_modules/.bin/tsc -p ./tsconfig.build.json
check_errcode "Failed to compile typescript! aborting script!"

echo "Copying essential files..."
bash ./scripts/copy-essentials.sh

check_errcode "Failed to copy essential files! aborting script!"

echo "Starting to configure React app..."
pushd react-src

echo "Building React app for $ENV..."
npm build --configuration $ENV
check_errcode "Failed to build react! stopping script!"

# TODO: Remove this 'if' statment until the 'fi' if you don't want SSR at all
if [ $ENV == "production" ]; then
    echo "Building React app for SSR..."
    ./node_modules/.bin/ng run react-src:server:production
    check_errcode "Failed to build React app for SSR! aborting script!"
else
    echo "Skipping build for SSR as environment is NOT production"
fi

echo "Copying react dist into dist directory..."
mkdir ../dist/react
cp -Rf dist/* ../dist/react
check_errcode "Failed to copy anuglar dist files! aborting script!"

echo "Removing react-src dist directory..."
rm -rf dist

# Go back to the current directory
popd

echo "-- Finished building React & NodeJS, check dist directory --"
