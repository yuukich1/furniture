package handlers

import (
	"furniture/internal/domain"
	"furniture/internal/usecase"

	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type CategoryHandler struct {
	categoryUseCase usecase.CategoryUseCaseItf
}

func NewCategoryHandler(categoryUseCase usecase.CategoryUseCaseItf) *CategoryHandler {
	return &CategoryHandler{categoryUseCase: categoryUseCase}
}

func (h *CategoryHandler) Create(c *gin.Context) {
	var dto domain.CategoryDTO
	if err := c.ShouldBindJSON(&dto); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}
	id, err := h.categoryUseCase.Create(c.Request.Context(), dto)
	if err != nil {
		handleError(c, err)
		return
	}
	c.JSON(http.StatusCreated, gin.H{
		"id": id,
	})
}

func (h *CategoryHandler) List(c *gin.Context) {
	limit, offset := pagination(c)
	parentIDStr := c.Query("parentID")

	var (
		categories []domain.CategoryResponse
		err        error
	)
	if parentIDStr != "" {
		parentID, parseErr := strconv.Atoi(parentIDStr)
		if parseErr != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid parent ID"})
			return
		}
		categories, err = h.categoryUseCase.GetByParentID(c.Request.Context(), &parentID, limit, offset)
	} else {
		categories, err = h.categoryUseCase.List(c.Request.Context(), limit, offset)
	}
	if err != nil {
		handleError(c, err)
		return
	}
	c.JSON(http.StatusOK, categories)
}

func (h *CategoryHandler) GetByID(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid category id"})
		return
	}
	category, err := h.categoryUseCase.GetByID(c.Request.Context(), id)
	if err != nil {
		handleError(c, err)
		return
	}
	c.JSON(http.StatusOK, category)
}

func (h *CategoryHandler) Update(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid category id"})
		return
	}
	var dto domain.CategoryDTO
	if err := c.ShouldBindJSON(&dto); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}
	if err := h.categoryUseCase.Update(c.Request.Context(), id, dto); err != nil {
		handleError(c, err)
		return
	}
	c.Status(http.StatusNoContent)
}

func (h *CategoryHandler) Delete(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid category id"})
		return
	}
	if err := h.categoryUseCase.Delete(c.Request.Context(), id); err != nil {
		handleError(c, err)
		return
	}
	c.Status(http.StatusNoContent)
}
