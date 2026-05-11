# track-remap: build and demo for CDN-distributed JS
# Build context is track-remap/. Contains src/image-to-path (image → path) and src/path-to-fit (apply/merge to activity files).
FROM node:24.14-alpine

WORKDIR /app

COPY package.json ./
RUN npm install

# Sources are mounted via volume
