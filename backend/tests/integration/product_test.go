package integration

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"
)

func createTestProduct(t *testing.T, app *testApp) int {
	t.Helper()

	name := fmt.Sprintf("Test Product %d", time.Now().UnixNano())

	body := fmt.Sprintf(`{
		"category_id": 1,
		"name": "%s",
		"description": "Test product",
		"price": 1000,
		"stock": 10,
		"weight": 10,
		"height": 100,
		"depth": 50,
		"material": "wood",
		"color": "black"
	}`, name)

	req := httptest.NewRequest(
		http.MethodPost,
		"/products",
		strings.NewReader(body),
	)
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	app.r.ServeHTTP(w, req)

	if w.Code != http.StatusCreated {
		t.Fatalf(
			"failed to create test product: expected %d, got %d: %s",
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
		t.Fatalf("expected valid product ID, got %d", response.ID)
	}

	t.Cleanup(func() {
		_, err := app.db.Exec(
			"DELETE FROM products WHERE id = $1",
			response.ID,
		)
		if err != nil {
			t.Errorf(
				"failed to cleanup product %d: %v",
				response.ID,
				err,
			)
		}
	})

	return response.ID
}

func TestCreateProduct(t *testing.T) {
	app := setupTestApp(t)

	name := fmt.Sprintf("Test Product %d", time.Now().UnixNano())

	body := fmt.Sprintf(`{
		"category_id": 1,
		"name": "%s",
		"description": "Test product",
		"price": 1000,
		"stock": 10,
		"weight": 10,
		"height": 100,
		"depth": 50,
		"material": "wood",
		"color": "black"
	}`, name)

	req := httptest.NewRequest(
		http.MethodPost,
		"/products",
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
		t.Fatalf("expected valid product ID, got %d", response.ID)
	}

	t.Cleanup(func() {
		_, err := app.db.Exec(
			"DELETE FROM products WHERE id = $1",
			response.ID,
		)
		if err != nil {
			t.Errorf("failed to cleanup product %d: %v", response.ID, err)
		}
	})
}

func TestListProducts(t *testing.T) {
	app := setupTestApp(t)

	createTestProduct(t, app)

	req := httptest.NewRequest(
		http.MethodGet,
		"/products?limit=10&offset=0",
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
}

func TestFilterProducts(t *testing.T) {
	app := setupTestApp(t)

	createTestProduct(t, app)

	req := httptest.NewRequest(
		http.MethodGet,
		"/products?color=black&material=wood&limit=10&offset=0",
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
}

func TestGetProductByID(t *testing.T) {
	app := setupTestApp(t)

	id := createTestProduct(t, app)

	req := httptest.NewRequest(
		http.MethodGet,
		fmt.Sprintf("/products/%d", id),
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
}

func TestUpdateProduct(t *testing.T) {
	app := setupTestApp(t)

	id := createTestProduct(t, app)

	name := fmt.Sprintf("Updated Product %d", time.Now().UnixNano())

	body := fmt.Sprintf(`{
		"category_id": 1,
		"name": "%s",
		"description": "Updated product",
		"price": 2000,
		"stock": 20,
		"weight": 20,
		"height": 200,
		"depth": 100,
		"material": "metal",
		"color": "white"
	}`, name)

	req := httptest.NewRequest(
		http.MethodPut,
		fmt.Sprintf("/products/%d", id),
		strings.NewReader(body),
	)
	req.Header.Set("Content-Type", "application/json")

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
}

func TestDeleteProduct(t *testing.T) {
	app := setupTestApp(t)

	id := createTestProduct(t, app)

	req := httptest.NewRequest(
		http.MethodDelete,
		fmt.Sprintf("/products/%d", id),
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
}
