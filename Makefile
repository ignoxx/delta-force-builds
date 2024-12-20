dev:
	@npm run dev

build: build-fe
	@GOARCH=amd64 GOOS=linux go build -ldflags="-s -w" main.go

build-fe:
	@npm run build
