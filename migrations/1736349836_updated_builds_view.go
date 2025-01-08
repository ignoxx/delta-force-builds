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
			"viewQuery": "SELECT id, type, image, code, author, description, title, weapon, copies, likes, dislikes, server, mode, created\nFROM builds\nWHERE approved = TRUE"
		}`), &collection); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("_clone_a9dP")

		// remove field
		collection.Fields.RemoveById("_clone_FGXs")

		// remove field
		collection.Fields.RemoveById("_clone_z1S0")

		// remove field
		collection.Fields.RemoveById("_clone_Ljpl")

		// remove field
		collection.Fields.RemoveById("_clone_uOYd")

		// remove field
		collection.Fields.RemoveById("_clone_3mzg")

		// remove field
		collection.Fields.RemoveById("_clone_53j2")

		// remove field
		collection.Fields.RemoveById("_clone_maSA")

		// remove field
		collection.Fields.RemoveById("_clone_aF3S")

		// remove field
		collection.Fields.RemoveById("_clone_G2br")

		// remove field
		collection.Fields.RemoveById("_clone_NjG3")

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_1219621782",
			"hidden": false,
			"id": "_clone_5F2q",
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
			"id": "_clone_6IW8",
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
			"id": "_clone_UAZZ",
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
			"id": "_clone_xD92",
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
			"id": "_clone_Omox",
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
			"id": "_clone_cgkF",
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
			"id": "_clone_RIF1",
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
			"id": "_clone_r11c",
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
			"id": "_clone_43rW",
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
			"id": "_clone_GTZ3",
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
			"id": "_clone_abiN",
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
			"id": "_clone_aGoN",
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
			"id": "_clone_G5Gh",
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
			"viewQuery": "SELECT id, type, image, code, author, description, title, weapon, copies, server, mode, created\nFROM builds\nWHERE approved = TRUE"
		}`), &collection); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_1219621782",
			"hidden": false,
			"id": "_clone_a9dP",
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
			"id": "_clone_FGXs",
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
			"id": "_clone_z1S0",
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
			"id": "_clone_Ljpl",
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
			"id": "_clone_uOYd",
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
			"id": "_clone_3mzg",
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
			"id": "_clone_53j2",
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
			"id": "_clone_maSA",
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
			"id": "_clone_aF3S",
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
		if err := collection.Fields.AddMarshaledJSONAt(10, []byte(`{
			"hidden": false,
			"id": "_clone_G2br",
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
		if err := collection.Fields.AddMarshaledJSONAt(11, []byte(`{
			"hidden": false,
			"id": "_clone_NjG3",
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
		collection.Fields.RemoveById("_clone_5F2q")

		// remove field
		collection.Fields.RemoveById("_clone_6IW8")

		// remove field
		collection.Fields.RemoveById("_clone_UAZZ")

		// remove field
		collection.Fields.RemoveById("_clone_xD92")

		// remove field
		collection.Fields.RemoveById("_clone_Omox")

		// remove field
		collection.Fields.RemoveById("_clone_cgkF")

		// remove field
		collection.Fields.RemoveById("_clone_RIF1")

		// remove field
		collection.Fields.RemoveById("_clone_r11c")

		// remove field
		collection.Fields.RemoveById("_clone_43rW")

		// remove field
		collection.Fields.RemoveById("_clone_GTZ3")

		// remove field
		collection.Fields.RemoveById("_clone_abiN")

		// remove field
		collection.Fields.RemoveById("_clone_aGoN")

		// remove field
		collection.Fields.RemoveById("_clone_G5Gh")

		return app.Save(collection)
	})
}
