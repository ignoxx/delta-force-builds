package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1780065497")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "SELECT id, type, code, author, description, title, weapon, copies, likes, dislikes, server, mode, created\nFROM builds\nWHERE approved = TRUE"
		}`), &collection); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("_clone_EZ6j")

		// remove field
		collection.Fields.RemoveById("_clone_x6YR")

		// remove field
		collection.Fields.RemoveById("_clone_dIrA")

		// remove field
		collection.Fields.RemoveById("_clone_ugJP")

		// remove field
		collection.Fields.RemoveById("_clone_NfX0")

		// remove field
		collection.Fields.RemoveById("_clone_nfDf")

		// remove field
		collection.Fields.RemoveById("_clone_d1zc")

		// remove field
		collection.Fields.RemoveById("_clone_h7cI")

		// remove field
		collection.Fields.RemoveById("_clone_lDrl")

		// remove field
		collection.Fields.RemoveById("_clone_YUAw")

		// remove field
		collection.Fields.RemoveById("_clone_olVA")

		// remove field
		collection.Fields.RemoveById("_clone_nCXn")

		// remove field
		collection.Fields.RemoveById("_clone_TvCJ")

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_1219621782",
			"hidden": false,
			"id": "_clone_5nT8",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "type",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_P7f0",
			"max": 0,
			"min": 0,
			"name": "code",
			"pattern": "",
			"presentable": false,
			"primaryKey": false,
			"required": true,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(3, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_GY0X",
			"max": 0,
			"min": 0,
			"name": "author",
			"pattern": "",
			"presentable": false,
			"primaryKey": false,
			"required": true,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_lhMA",
			"max": 0,
			"min": 0,
			"name": "description",
			"pattern": "",
			"presentable": false,
			"primaryKey": false,
			"required": false,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(5, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_z59M",
			"max": 26,
			"min": 0,
			"name": "title",
			"pattern": "",
			"presentable": false,
			"primaryKey": false,
			"required": true,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(6, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_3F70",
			"max": 14,
			"min": 0,
			"name": "weapon",
			"pattern": "",
			"presentable": false,
			"primaryKey": false,
			"required": true,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(7, []byte(`{
			"hidden": false,
			"id": "_clone_3Fa2",
			"max": null,
			"min": null,
			"name": "copies",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(8, []byte(`{
			"hidden": false,
			"id": "_clone_i6vY",
			"max": null,
			"min": null,
			"name": "likes",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(9, []byte(`{
			"hidden": false,
			"id": "_clone_Q1YN",
			"max": null,
			"min": null,
			"name": "dislikes",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(10, []byte(`{
			"hidden": false,
			"id": "_clone_Jyts",
			"maxSelect": 1,
			"name": "server",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "select",
			"values": [
				"global",
				"garena"
			]
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(11, []byte(`{
			"hidden": false,
			"id": "_clone_OFug",
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

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(12, []byte(`{
			"hidden": false,
			"id": "_clone_4vRR",
			"name": "created",
			"onCreate": true,
			"onUpdate": false,
			"presentable": false,
			"system": false,
			"type": "autodate"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1780065497")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "SELECT id, type, image, code, author, description, title, weapon, copies, likes, dislikes, server, mode, created\nFROM builds\nWHERE approved = TRUE"
		}`), &collection); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_1219621782",
			"hidden": false,
			"id": "_clone_EZ6j",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "type",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"hidden": false,
			"id": "_clone_x6YR",
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

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(3, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_dIrA",
			"max": 0,
			"min": 0,
			"name": "code",
			"pattern": "",
			"presentable": false,
			"primaryKey": false,
			"required": true,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_ugJP",
			"max": 0,
			"min": 0,
			"name": "author",
			"pattern": "",
			"presentable": false,
			"primaryKey": false,
			"required": true,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(5, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_NfX0",
			"max": 0,
			"min": 0,
			"name": "description",
			"pattern": "",
			"presentable": false,
			"primaryKey": false,
			"required": false,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(6, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_nfDf",
			"max": 26,
			"min": 0,
			"name": "title",
			"pattern": "",
			"presentable": false,
			"primaryKey": false,
			"required": true,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(7, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_d1zc",
			"max": 14,
			"min": 0,
			"name": "weapon",
			"pattern": "",
			"presentable": false,
			"primaryKey": false,
			"required": true,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(8, []byte(`{
			"hidden": false,
			"id": "_clone_h7cI",
			"max": null,
			"min": null,
			"name": "copies",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(9, []byte(`{
			"hidden": false,
			"id": "_clone_lDrl",
			"max": null,
			"min": null,
			"name": "likes",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(10, []byte(`{
			"hidden": false,
			"id": "_clone_YUAw",
			"max": null,
			"min": null,
			"name": "dislikes",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(11, []byte(`{
			"hidden": false,
			"id": "_clone_olVA",
			"maxSelect": 1,
			"name": "server",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "select",
			"values": [
				"global",
				"garena"
			]
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(12, []byte(`{
			"hidden": false,
			"id": "_clone_nCXn",
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

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(13, []byte(`{
			"hidden": false,
			"id": "_clone_TvCJ",
			"name": "created",
			"onCreate": true,
			"onUpdate": false,
			"presentable": false,
			"system": false,
			"type": "autodate"
		}`)); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("_clone_5nT8")

		// remove field
		collection.Fields.RemoveById("_clone_P7f0")

		// remove field
		collection.Fields.RemoveById("_clone_GY0X")

		// remove field
		collection.Fields.RemoveById("_clone_lhMA")

		// remove field
		collection.Fields.RemoveById("_clone_z59M")

		// remove field
		collection.Fields.RemoveById("_clone_3F70")

		// remove field
		collection.Fields.RemoveById("_clone_3Fa2")

		// remove field
		collection.Fields.RemoveById("_clone_i6vY")

		// remove field
		collection.Fields.RemoveById("_clone_Q1YN")

		// remove field
		collection.Fields.RemoveById("_clone_Jyts")

		// remove field
		collection.Fields.RemoveById("_clone_OFug")

		// remove field
		collection.Fields.RemoveById("_clone_4vRR")

		return app.Save(collection)
	})
}
