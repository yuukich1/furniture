package integration

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"

	"furniture/internal/domain"
)

func createTestCategory(t *testing.T, app *testApp, parentID *int) int {
	t.Helper()

	name := fmt.Sprintf("Test Category %d", time.Now().UnixNano())

	body := fmt.Sprintf(`{
		"name": "%s",
		"parent_id": %s
	}`, name, nullableIntJSON(parentID))

	req := httptest.NewRequest(
		http.MethodPost,
		"/categories",
		strings.NewReader(body),
	)
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	app.r.ServeHTTP(w, req)

	if w.Code != http.StatusCreated {
		t.Fatalf(
			"failed to create test category: expected %d, got %d: %s",
			http.StatusCreated,
			w.Code,
			w.Body.String(),
		)
	}

	var response struct {
		ID int `json:"id"`
	}

	if err := json.Unmarshal(w.Body.Bytes(), &response); err != nil {
		t.Fatalf("failed to decode response: %v", err)
	}

	if response.ID <= 0 {
		t.Fatalf("expected valid category ID, got %d", response.ID)
	}

	t.Cleanup(func() {
		_, err := app.db.Exec(
			"DELETE FROM category WHERE id = $1",
			response.ID,
		)
		if err != nil {
			t.Errorf(
				"failed to cleanup category %d: %v",
				response.ID,
				err,
			)
		}
	})

	return response.ID
}

func nullableIntJSON(value *int) string {
	if value == nil {
		return "null"
	}

	return fmt.Sprintf("%d", *value)
}

func TestCreateCategory(t *testing.T) {
	app := setupTestApp(t)

	name := fmt.Sprintf("Test Category %d", time.Now().UnixNano())

	body := fmt.Sprintf(`{
		"name": "%s",
		"parent_id": null
	}`, name)

	req := httptest.NewRequest(
		http.MethodPost,
		"/categories",
		strings.NewReader(body),
	)
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	app.r.ServeHTTP(w, req)

	if w.Code != http.StatusCreated {
		t.Fatalf(
			"expected %d, got %d: %s",
			http.StatusCreated,
			w.Code,
			w.Body.String(),
		)
	}

	var response struct {
		ID int `json:"id"`
	}

	if err := json.Unmarshal(w.Body.Bytes(), &response); err != nil {
		t.Fatalf("failed to decode response: %v", err)
	}

	if response.ID <= 0 {
		t.Fatalf("expected valid category ID, got %d", response.ID)
	}

	t.Cleanup(func() {
		_, err := app.db.Exec(
			"DELETE FROM category WHERE id = $1",
			response.ID,
		)
		if err != nil {
			t.Errorf(
				"failed to cleanup category %d: %v",
				response.ID,
				err,
			)
		}
	})
}

func TestGetCategories(t *testing.T) {
	app := setupTestApp(t)

	createTestCategory(t, app, nil)
	createTestCategory(t, app, nil)

	req := httptest.NewRequest(
		http.MethodGet,
		"/categories?limit=10&offset=0",
		nil,
	)

	w := httptest.NewRecorder()
	app.r.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Fatalf(
			"expected %d, got %d: %s",
			http.StatusOK,
			w.Code,
			w.Body.String(),
		)
	}

	var categories []domain.CategoryResponse

	if err := json.Unmarshal(w.Body.Bytes(), &categories); err != nil {
		t.Fatalf("failed to decode response: %v", err)
	}

	if len(categories) == 0 {
		t.Fatal("expected categories, got empty response")
	}

	if len(categories) > 10 {
		t.Fatalf(
			"expected at most 10 categories, got %d",
			len(categories),
		)
	}
}

func TestGetCategoriesByParentID(t *testing.T) {
	app := setupTestApp(t)

	parentID := createTestCategory(t, app, nil)

	childID := createTestCategory(t, app, &parentID)

	req := httptest.NewRequest(
		http.MethodGet,
		fmt.Sprintf(
			"/categories?parentID=%d&limit=10&offset=0",
			parentID,
		),
		nil,
	)

	w := httptest.NewRecorder()
	app.r.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Fatalf(
			"expected %d, got %d: %s",
			http.StatusOK,
			w.Code,
			w.Body.String(),
		)
	}

	var categories []domain.CategoryResponse

	if err := json.Unmarshal(w.Body.Bytes(), &categories); err != nil {
		t.Fatalf("failed to decode response: %v", err)
	}

	if len(categories) == 0 {
		t.Fatal("expected child categories, got empty response")
	}

	found := false

	for _, category := range categories {
		if category.ID == childID {
			found = true
			break
		}

		if category.ParentID == nil || *category.ParentID != parentID {
			t.Fatalf(
				"expected category %d to have parent %d",
				category.ID,
				parentID,
			)
		}
	}

	if !found {
		t.Fatalf(
			"expected child category %d in response",
			childID,
		)
	}
}

func TestGetCategoryByID(t *testing.T) {
	app := setupTestApp(t)

	id := createTestCategory(t, app, nil)

	req := httptest.NewRequest(
		http.MethodGet,
		fmt.Sprintf("/categories/%d", id),
		nil,
	)

	w := httptest.NewRecorder()
	app.r.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Fatalf(
			"expected %d, got %d: %s",
			http.StatusOK,
			w.Code,
			w.Body.String(),
		)
	}

	var category domain.CategoryResponse

	if err := json.Unmarshal(w.Body.Bytes(), &category); err != nil {
		t.Fatalf("failed to decode response: %v", err)
	}

	if category.ID != id {
		t.Fatalf(
			"expected category ID %d, got %d",
			id,
			category.ID,
		)
	}
}

func TestUpdateCategory(t *testing.T) {
	app := setupTestApp(t)

	id := createTestCategory(t, app, nil)

	name := fmt.Sprintf(
		"Updated Category %d",
		time.Now().UnixNano(),
	)

	body := fmt.Sprintf(`{
		"name": "%s",
		"parent_id": null
	}`, name)

	req := httptest.NewRequest(
		http.MethodPut,
		fmt.Sprintf("/categories/%d", id),
		strings.NewReader(body),
	)
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	app.r.ServeHTTP(w, req)

	if w.Code != http.StatusNoContent {
		t.Fatalf(
			"expected %d, got %d: %s",
			http.StatusNoContent,
			w.Code,
			w.Body.String(),
		)
	}

	req = httptest.NewRequest(
		http.MethodGet,
		fmt.Sprintf("/categories/%d", id),
		nil,
	)

	w = httptest.NewRecorder()
	app.r.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Fatalf(
			"expected %d, got %d: %s",
			http.StatusOK,
			w.Code,
			w.Body.String(),
		)
	}

	var category domain.CategoryResponse

	if err := json.Unmarshal(w.Body.Bytes(), &category); err != nil {
		t.Fatalf("failed to decode response: %v", err)
	}

	if category.ID != id {
		t.Fatalf(
			"expected category ID %d, got %d",
			id,
			category.ID,
		)
	}

	if category.Name != name {
		t.Fatalf(
			"expected category name %q, got %q",
			name,
			category.Name,
		)
	}
}

func TestDeleteCategory(t *testing.T) {
	app := setupTestApp(t)

	id := createTestCategory(t, app, nil)

	req := httptest.NewRequest(
		http.MethodDelete,
		fmt.Sprintf("/categories/%d", id),
		nil,
	)

	w := httptest.NewRecorder()
	app.r.ServeHTTP(w, req)

	if w.Code != http.StatusNoContent {
		t.Fatalf(
			"expected %d, got %d: %s",
			http.StatusNoContent,
			w.Code,
			w.Body.String(),
		)
	}

	req = httptest.NewRequest(
		http.MethodGet,
		fmt.Sprintf("/categories/%d", id),
		nil,
	)

	w = httptest.NewRecorder()
	app.r.ServeHTTP(w, req)

	if w.Code == http.StatusOK {
		t.Fatalf(
			"expected deleted category %d to be unavailable",
			id,
		)
	}
}
