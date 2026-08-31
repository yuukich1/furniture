package integration

import (
	"furniture/internal/database"
	"furniture/internal/handlers"
	"furniture/internal/repositories"
	"furniture/internal/router"
	"furniture/internal/usecase"
	"log"
	"os"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
	"github.com/joho/godotenv"
)

type testApp struct {
	db *sqlx.DB
	r  *gin.Engine
}

func TestMain(m *testing.M) {
	if err := godotenv.Load("../../.env"); err != nil {
		log.Fatal("failed to load .env:", err)
	}

	if os.Getenv("DATABASE_URL") == "" {
		log.Fatal("DATABASE_URL is not set")
	}

	os.Exit(m.Run())
}

func setupTestApp(t *testing.T) *testApp {
	t.Helper()

	db := database.New()

	c_repo := repositories.NewCategoryRepository(db)
	p_repo := repositories.NewProductRepository(db)
	pi_repo := repositories.NewProductImageRepository(db)
	c_uc := usecase.NewCategoryUseCase(c_repo)
	pi_uc := usecase.NewProductImageUseCase(pi_repo)
	p_uc := usecase.NewProductUseCase(p_repo, pi_uc)
	c_h := handlers.NewCategoryHandler(c_uc)
	p_h := handlers.NewProductHandler(p_uc)
	r := router.New(c_h, p_h)

	t.Cleanup(func() {
		db.Close()
	})

	return &testApp{
		db: db,
		r:  r,
	}
}
