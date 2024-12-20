# Build application
FROM golang:1.23 AS builder

COPY . .

RUN GOOS=linux GOARCH=amd64 go build -ldflags="-s -w" -o /bin/main

RUN chmod +x /bin/main

# Runner
FROM alpine:latest AS runner

WORKDIR /app

COPY --from=builder /bin/main /app/main

RUN apk add --no-cache \
    unzip \
    ca-certificates

# uncomment to copy the local pb_migrations dir into the image
# COPY ./pb_migrations /pb/pb_migrations

# uncomment to copy the local pb_hooks dir into the image
# COPY ./pb_hooks /pb/pb_hooks

EXPOSE 8080

ENTRYPOINT ["/app/main", "serve", "--http=0.0.0.0:8080"]

