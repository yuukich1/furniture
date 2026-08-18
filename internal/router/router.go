package router

import (
	"furniture/internal/handlers"

	"github.com/gin-gonic/gin"
)

func New(categoryHandler *handlers.CategoryHandler) *gin.Engine {
	r := gin.New()

	categoryRoutes := r.Group("/categories")
	{
		categoryRoutes.POST("", categoryHandler.Create)
		categoryRoutes.GET("", categoryHandler.List)
		categoryRoutes.GET("/:id", categoryHandler.GetByID)
		categoryRoutes.PUT("/:id", categoryHandler.Update)
		categoryRoutes.DELETE("/:id", categoryHandler.Delete)
	}
	return r
}
