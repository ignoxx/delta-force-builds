# Build Node.js application (Remix)
FROM node:20 AS node-builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Build Go application
FROM golang:1.23 AS builder

WORKDIR /app

COPY --from=node-builder /app .

RUN go build -o main

RUN chmod +x main

# Uncomment to copy the local pb_migrations dir into the image
# COPY ./pb_migrations /pb/pb_migrations

# Uncomment to copy the local pb_hooks dir into the image
# COPY ./pb_hooks /pb/pb_hooks

EXPOSE 8080

ENTRYPOINT ["/app/main", "serve", "--http=0.0.0.0:8080", "--dir=/pb/pb_data"]
