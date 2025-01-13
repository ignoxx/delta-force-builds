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
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"hidden": true,
			"id": "file3309110367",
			"maxSelect": 0,
			"maxSize": 0,
			"mimeTypes": [
				"image/png",
				"image/jpeg"
			],
			"name": "image",
			"presentable": false,
			"protected": true,
			"required": false,
			"system": false,
			"thumbs": [
				"0x100",
				"0x200",
				"0x300",
				"0x400",
				"0x500",
				"0x600"
			],
			"type": "file"
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
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"hidden": true,
			"id": "file3309110367",
			"maxSelect": 99,
			"maxSize": 0,
			"mimeTypes": [
				"image/png",
				"image/jpeg"
			],
			"name": "image",
			"presentable": false,
			"protected": false,
			"required": true,
			"system": false,
			"thumbs": [
				"0x100",
				"0x200",
				"0x300",
				"0x400",
				"0x500",
				"0x600"
			],
			"type": "file"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
