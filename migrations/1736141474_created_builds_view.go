package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		jsonData := `{
			"createRule": null,
			"deleteRule": null,
			"fields": [
				{
					"autogeneratePattern": "",
					"hidden": false,
					"id": "text3208210256",
					"max": 0,
					"min": 0,
					"name": "id",
					"pattern": "^[a-z0-9]+$",
					"presentable": false,
					"primaryKey": true,
					"required": true,
					"system": true,
					"type": "text"
				},
				{
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
				},
				{
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
				},
				{
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
				},
				{
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
				},
				{
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
				},
				{
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
				},
				{
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
				},
				{
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
				},
				{
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
				},
				{
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
				},
				{
					"hidden": false,
					"id": "_clone_NjG3",
					"name": "created",
					"onCreate": true,
					"onUpdate": false,
					"presentable": false,
					"system": false,
					"type": "autodate"
				}
			],
			"id": "pbc_1780065497",
			"indexes": [],
			"listRule": "",
			"name": "builds_view",
			"system": false,
			"type": "view",
			"updateRule": null,
			"viewQuery": "SELECT id, type, image, code, author, description, title, weapon, copies, server, mode, created\nFROM builds\nWHERE approved = TRUE",
			"viewRule": ""
		}`

		collection := &core.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_1780065497")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
