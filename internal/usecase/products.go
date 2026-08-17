package usecase

import (
	"context"
	"fmt"
	"furniture/internal/domain"
	"furniture/internal/repositories"
)

type ProductUseCaseItf interface {
	Create(ctx context.Context, dto domain.Product) (int, error)
	List(ctx context.Context, limit *int, offset *int) ([]domain.ProductResponse, error)
	GetByID(ctx context.Context, id int) (domain.ProductResponse, error)
}

type ProductUseCase struct {
	productRepo      repositories.ProductRepositoryItf
	productImageRepo repositories.ProductImageRepositoryItf
}

func NewProductUseCase(productRepo repositories.ProductRepositoryItf, productImageRepo repositories.ProductImageRepositoryItf) ProductUseCaseItf {
	return &ProductUseCase{productRepo: productRepo, productImageRepo: productImageRepo}
}

func (u ProductUseCase) Create(ctx context.Context, dto domain.Product) (int, error) {
	productID, err := u.productRepo.Insert(ctx, domain.Product{
		CategoryID:  dto.CategoryID,
		Name:        dto.Name,
		Description: dto.Description,
		Price:       dto.Price,
		Stock:       dto.Stock,
		Weight:      dto.Weight,
		Height:      dto.Height,
		Depth:       dto.Depth,
		Material:    dto.Material,
		Color:       dto.Color,
	})
	if err != nil {
		return 0, fmt.Errorf("ProductUseCase.Careate: %w", err)
	}
	return productID, nil
}

func (u ProductUseCase) List(ctx context.Context, limit *int, offset *int) ([]domain.ProductResponse, error) {
	products, err := u.productRepo.List(ctx, limit, offset)
	if err != nil {
		return nil, fmt.Errorf("ProductUseCase.List: %w", err)
	}
	result := make([]domain.ProductResponse, len(products))
	for _, product := range products {
		images, err := u.productImageRepo.GetByProductID(ctx, product.ID)
		if err != nil {
			return nil, fmt.Errorf("ProductUseCase.List: %w", err)
		}
		var reponseImages = make([]domain.ProductImageResponse, len(images))
		for _, image := range images {
			reponseImages = append(reponseImages, domain.ProductImageResponse{
				ID:     image.ID,
				URL:    image.ImageUrl,
				IsMain: image.IsMain,
			})
		}
		result = append(result, domain.ProductResponse{
			ID:          product.ID,
			CategoryID:  product.CategoryID,
			Name:        product.Name,
			Description: product.Description,
			Price:       product.Price,
			Stock:       product.Stock,
			Weight:      product.Weight,
			Height:      product.Height,
			Depth:       product.Depth,
			Material:    product.Material,
			Color:       product.Color,
			Images:      reponseImages,
		})
	}
	return result, nil
}

func (u ProductUseCase) GetByID(ctx context.Context, id int) (domain.ProductResponse, error) {
	product, err := u.productRepo.GetByID(ctx, id)
	if err != nil {
		return domain.ProductResponse{}, fmt.Errorf("ProductUseCase.GetByID: %w", err)
	}
	images, err := u.productImageRepo.GetByProductID(ctx, product.ID)
	if err != nil {
		return domain.ProductResponse{}, fmt.Errorf("ProductUseCase.GetByID: %w", err)
	}
	var reponseImages = make([]domain.ProductImageResponse, len(images))
	for _, image := range images {
		reponseImages = append(reponseImages, domain.ProductImageResponse{
			ID:     image.ID,
			URL:    image.ImageUrl,
			IsMain: image.IsMain,
		})
	}
	return domain.ProductResponse{
		ID:          product.ID,
		CategoryID:  product.CategoryID,
		Name:        product.Name,
		Description: product.Description,
		Price:       product.Price,
		Stock:       product.Stock,
		Weight:      product.Weight,
		Height:      product.Height,
		Depth:       product.Depth,
		Material:    product.Material,
		Color:       product.Color,
		Images:      reponseImages,
	}, nil
}
