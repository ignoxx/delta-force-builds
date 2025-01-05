package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1033968107")
		if err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(10, []byte(`{
			"hidden": false,
			"id": "select2546616235",
			"maxSelect": 2,
			"name": "mode",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "select",
			"values": [
				"operation",
				"warfare"
			]
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1033968107")
		if err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(10, []byte(`{
			"hidden": false,
			"id": "select2546616235",
			"maxSelect": 2,
			"name": "mode",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "select",
			"values": [
				"operation",
				"warfare"
			]
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
