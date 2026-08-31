package handlers

import (
	"furniture/internal/domain"
	"furniture/internal/usecase"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type ProductHandler struct {
	productUseCase usecase.ProductUseCaseItf
}

func NewProductHandler(productUseCase usecase.ProductUseCaseItf) *ProductHandler {
	return &ProductHandler{productUseCase: productUseCase}
}

func (h *ProductHandler) Create(c *gin.Context) {
	var dto domain.ProductDTO
	if err := c.ShouldBindJSON(&dto); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}
	id, err := h.productUseCase.Create(c.Request.Context(), dto)
	if err != nil {
		handleError(c, err)
		return
	}
	c.JSON(http.StatusCreated, gin.H{"id": id})
}

func (h *ProductHandler) List(c *gin.Context) {
	limit, offset := pagination(c)
	var filter domain.ProductFilters
	if err := c.ShouldBindQuery(&filter); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid filters"})
		return
	}
	products, err := h.productUseCase.GetByFilters(c.Request.Context(), filter, limit, offset)
	if err != nil {
		handleError(c, err)
		return
	}
	c.JSON(http.StatusOK, products)
}

func (h *ProductHandler) GetByID(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid product ID"})
		return
	}
	product, err := h.productUseCase.GetByID(c.Request.Context(), id)
	if err != nil {
		handleError(c, err)
		return
	}
	c.JSON(http.StatusOK, product)
}

func (h *ProductHandler) Update(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid product ID"})
		return
	}
	var dto domain.ProductDTO
	if err := c.ShouldBindJSON(&dto); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}
	productID, err := h.productUseCase.Update(c.Request.Context(), id, dto)
	if err != nil {
		handleError(c, err)
		return
	}
	c.JSON(http.StatusOK, productID)
}

func (h *ProductHandler) Delete(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid product ID"})
		return
	}
	err = h.productUseCase.Delete(c.Request.Context(), id)
	if err != nil {
		handleError(c, err)
		return
	}
	c.Status(http.StatusNoContent)
}
