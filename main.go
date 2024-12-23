package main

import (
	"embed"
	"io/fs"
	"log"
	"os"
	"strings"

	"github.com/joho/godotenv"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"

	_ "github.com/ignoxx/delta-force-builds/migrations"
)

//go:embed all:build/client
var distDir embed.FS

func main() {
	godotenv.Load()
	app := pocketbase.New()

	stage := os.Getenv("VITE_STAGE")

	distDirFs := os.DirFS("./pb_public")
	if stage == "prod" || stage == "production" {
		distDirFs, _ = fs.Sub(distDir, "build/client")
	}

	// loosely check if it was executed using "go run"
	isGoRun := strings.HasPrefix(os.Args[0], os.TempDir())

	migratecmd.MustRegister(app, app.RootCmd, migratecmd.Config{
		// enable auto creation of migration files when making collection changes in the Dashboard
		// (the isGoRun check is to enable it only during development)
		Automigrate: isGoRun,
	})

	app.OnServe().BindFunc(func(se *core.ServeEvent) error {
		se.Router.GET("/{path...}", apis.Static(distDirFs, true))

		return se.Next()
	})

	log.Printf("STAGE: %s\n", stage)

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
