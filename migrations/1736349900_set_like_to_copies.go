package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		_, err := app.DB().NewQuery("UPDATE builds SET likes = copies").Execute()
		return err
	}, func(app core.App) error {
		// add down queries...

		return nil
	})
}
