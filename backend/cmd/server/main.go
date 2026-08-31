package main

import (
	"furniture/internal/database"
	"furniture/internal/handlers"
	"furniture/internal/repositories"
	"furniture/internal/router"
	"furniture/internal/usecase"
	"log"

	"github.com/joho/godotenv"
)

func main() {
	_ = godotenv.Load(".env")
	db := database.New()
	defer db.Close()

	categoryRepository := repositories.NewCategoryRepository(db)
	categoryUseCase := usecase.NewCategoryUseCase(categoryRepository)
	categoryHandler := handlers.NewCategoryHandler(categoryUseCase)

	productRepository := repositories.NewProductRepository(db)
	productImageRepository := repositories.NewProductImageRepository(db)
	productImageUseCase := usecase.NewProductImageUseCase(productImageRepository)
	productUseCase := usecase.NewProductUseCase(productRepository, productImageUseCase)
	productHandler := handlers.NewProductHandler(productUseCase)

	r := router.New(categoryHandler, productHandler)
	log.Println("server started on :8080")
	if err := r.Run(":8080"); err != nil {
		log.Fatal(err)
	}
}
