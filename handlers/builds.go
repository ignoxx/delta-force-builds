package handlers

import (
	"net/http"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/core"
)

func HandleCopy(e *core.RequestEvent) error {
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
}

func HandleLike(e *core.RequestEvent) error {
	buildID := e.Request.PathValue("buildID")

	record, err := e.App.FindRecordById("builds", buildID)
	if err != nil {
		return err
	}

	likes, ok := record.Get("likes").(float64)
	if !ok {
		return e.JSON(http.StatusInternalServerError, map[string]string{"success": "false"})
	}

	record.Set("likes", likes+1)
	if err := e.App.Save(record); err != nil {
		return err
	}

	return e.JSON(http.StatusOK, map[string]bool{"success": true})
}

func HandleDislike(e *core.RequestEvent) error {
	buildID := e.Request.PathValue("buildID")

	record, err := e.App.FindRecordById("builds", buildID)
	if err != nil {
		return err
	}

	dislikes, ok := record.Get("dislikes").(float64)
	if !ok {
		return e.JSON(http.StatusInternalServerError, map[string]string{"success": "false"})
	}

	record.Set("dislikes", dislikes+1)
	if err := e.App.Save(record); err != nil {
		return err
	}

	return e.JSON(http.StatusOK, map[string]bool{"success": true})
}

func HandleReport(e *core.RequestEvent) error {
	buildID := e.Request.PathValue("buildID")

	collection, err := e.App.FindCollectionByNameOrId("reports")
	if err != nil {
		e.App.Logger().Error(err.Error())
		return e.JSON(http.StatusInternalServerError, map[string]bool{"success": true})
	}

	record, _ := e.App.FindRecordsByFilter(
		collection,
		"build = {:buildID}",
		"",
		1,
		0,
		dbx.Params{"buildID": buildID},
	)

	if len(record) == 0 {
		r := core.NewRecord(collection)
		r.Set("build", buildID)
		r.Set("count", 1)

		err := e.App.Save(r)
		if err != nil {
			return err
		}

		return e.JSON(http.StatusOK, map[string]bool{"success": true})
	}

	count, ok := record[0].Get("count").(float64)
	if !ok {
		return e.JSON(http.StatusInternalServerError, map[string]string{"success": "false"})
	}

	record[0].Set("count", count+1)
	if err := e.App.Save(record[0]); err != nil {
		return err
	}

	return e.JSON(http.StatusOK, map[string]bool{"success": true})
}
