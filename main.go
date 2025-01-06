package main

import (
	"embed"
	"io/fs"
	"log"
	"net/http"
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

		se.Router.POST("/api/copied/{buildID}", func(e *core.RequestEvent) error {
			buildID := e.Request.PathValue("buildID")

			record, err := e.App.FindRecordById("builds", buildID)
			if err != nil {
				return err
			}

			copies, ok := record.Get("copies").(float64)
			if !ok {
				return e.JSON(http.StatusInternalServerError, map[string]string{"success": "false"})
			}

			record.Set("copies", copies+1)
			if err := e.App.Save(record); err != nil {
				return err
			}

			return e.JSON(http.StatusOK, map[string]bool{"success": true})
		})

		return se.Next()
	})

	log.Printf("STAGE: %s\n", stage)

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
