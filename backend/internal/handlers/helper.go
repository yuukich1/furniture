package handlers

import (
	"errors"
	"furniture/internal/domain"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func pagination(c *gin.Context) (*int, *int) {
	var limit *int
	var offset *int

	if value := c.Query("limit"); value != "" {
		if parsed, err := strconv.Atoi(value); err == nil {
			limit = &parsed
		}
	}

	if value := c.Query("offset"); value != "" {
		if parsed, err := strconv.Atoi(value); err == nil {
			offset = &parsed
		}
	}

	return limit, offset
}

func handleError(c *gin.Context, err error) {
	switch {
	case errors.Is(err, domain.ErrNotFound):
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Resource not found",
		})

	case errors.Is(err, domain.ErrAlreadyExists):
		c.JSON(http.StatusConflict, gin.H{
			"error": "Resource already exists",
		})

	case errors.Is(err, domain.ErrInvalidInput):
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid input",
		})

	default:
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Internal server error",
		})
	}
}
