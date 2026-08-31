package router

import (
	"furniture/internal/handlers"

	"github.com/gin-gonic/gin"
)

func New(categoryHandler *handlers.CategoryHandler, productHandler *handlers.ProductHandler) *gin.Engine {
	r := gin.New()

	categoryRoutes := r.Group("/categories")
	{
		categoryRoutes.POST("", categoryHandler.Create)
		categoryRoutes.GET("", categoryHandler.List)
		categoryRoutes.GET("/:id", categoryHandler.GetByID)
		categoryRoutes.PUT("/:id", categoryHandler.Update)
		categoryRoutes.DELETE("/:id", categoryHandler.Delete)
	}

	productRoutes := r.Group("/products")
	{
		productRoutes.POST("", productHandler.Create)
		productRoutes.GET("", productHandler.List)
		productRoutes.GET("/:id", productHandler.GetByID)
		productRoutes.PUT("/:id", productHandler.Update)
		productRoutes.DELETE("/:id", productHandler.Delete)
	}
	return r
}
