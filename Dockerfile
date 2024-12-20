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

COPY . .
COPY --from=node-builder /app/build ./build

RUN GOOS=linux GOARCH=amd64 go build -ldflags="-s -w" -o /bin/main

RUN chmod +x /bin/main

# Runner
FROM alpine:latest AS runner

WORKDIR /app

COPY --from=builder /bin/main /bin/main

RUN apk add --no-cache \
    unzip \
    ca-certificates

# Uncomment to copy the local pb_migrations dir into the image
# COPY ./pb_migrations /pb/pb_migrations

# Uncomment to copy the local pb_hooks dir into the image
# COPY ./pb_hooks /pb/pb_hooks

EXPOSE 8080

ENTRYPOINT ["/bin/main", "serve", "--http=0.0.0.0:8080"]
