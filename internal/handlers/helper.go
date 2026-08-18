package handlers

import (
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
