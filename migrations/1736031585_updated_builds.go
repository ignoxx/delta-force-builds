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

		// remove field
		collection.Fields.RemoveById("number1237995133")

		// remove field
		collection.Fields.RemoveById("text3116461259")

		// add field
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
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1033968107")
		if err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(3, []byte(`{
			"hidden": true,
			"id": "number1237995133",
			"max": null,
			"min": null,
			"name": "likes",
			"onlyInt": true,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(8, []byte(`{
			"autogeneratePattern": "",
			"hidden": true,
			"id": "text3116461259",
			"max": 0,
			"min": 0,
			"name": "discordName",
			"pattern": "^@.*$",
			"presentable": false,
			"primaryKey": false,
			"required": false,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("select2546616235")

		return app.Save(collection)
	})
}
