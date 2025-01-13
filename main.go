package main

import (
	"embed"
	"io/fs"
	"log"
	"log/slog"
	"os"
	"strings"

	"github.com/joho/godotenv"
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"

	"github.com/ignoxx/delta-force-builds/handlers"
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

		se.Router.POST("/api/build/copy/{buildID}", handlers.HandleCopy)
		se.Router.POST("/api/build/like/{buildID}", handlers.HandleLike)
		se.Router.POST("/api/build/dislike/{buildID}", handlers.HandleDislike)
		se.Router.POST("/api/build/report/{buildID}", handlers.HandleReport)

		return se.Next()
	})

	app.OnRecordCreate("builds").BindFunc(func(e *core.RecordEvent) error {
		e.Record.Set("approved", true)
		return e.Next()
	})

	app.OnRecordAfterUpdateSuccess("reports").BindFunc(func(e *core.RecordEvent) error {
		count, ok := e.Record.Get("count").(float64)
		if !ok {
			app.Logger().Error("count is not a float64")
			return e.Next()
		}

		buildID, ok := e.Record.Get("build").(string)

		if count > 20 {
			app.Logger().Info("report count is greater than 20", slog.String("buildID", buildID))
			e.App.DB().
				NewQuery("UPDATE builds SET approved = false WHERE id = {:buildID}").
				Bind(dbx.Params{"buildID": buildID}).
				Execute()
		}

		return e.Next()
	})

	app.Logger().Info("", slog.String("stage", stage))

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
