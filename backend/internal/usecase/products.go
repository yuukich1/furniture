package usecase

import (
	"context"
	"fmt"
	"furniture/internal/domain"
	"furniture/internal/repositories"
)

type ProductUseCaseItf interface {
	Create(ctx context.Context, dto domain.ProductDTO) (int, error)
	GetByID(ctx context.Context, id int) (domain.ProductResponse, error)
	GetByFilters(ctx context.Context, f domain.ProductFilters, limit *int, offset *int) ([]domain.ProductResponse, error)
	Delete(ctx context.Context, id int) error
	Update(ctx context.Context, productID int, dto domain.ProductDTO) (int, error)
}

type ProductUseCase struct {
	productRepo         repositories.ProductRepositoryItf
	productImageUseCase ProductImageUseCaseItf
}

func NewProductUseCase(productRepo repositories.ProductRepositoryItf, productImageUseCase ProductImageUseCaseItf) ProductUseCaseItf {
	return &ProductUseCase{productRepo: productRepo, productImageUseCase: productImageUseCase}
}

func toProductResponse(product domain.Product, images []domain.ProductImageResponse) domain.ProductResponse {
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
		Images:      images,
	}
}

func toProductFromDTO(dto domain.ProductDTO) domain.Product {
	return domain.Product{
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
	}
}

func (u *ProductUseCase) makeResponseList(ctx context.Context, products []domain.Product) ([]domain.ProductResponse, error) {
	result := make([]domain.ProductResponse, 0, len(products))
	for _, product := range products {
		images, err := u.productImageUseCase.GetByProductID(ctx, product.ID)
		if err != nil {
			return nil, fmt.Errorf("productImageUseCase.GetByProductID: %w", err)
		}
		result = append(result, toProductResponse(product, images))
	}
	return result, nil
}

func (u *ProductUseCase) Create(ctx context.Context, dto domain.ProductDTO) (int, error) {
	productID, err := u.productRepo.Insert(ctx, toProductFromDTO(dto))
	if err != nil {
		return 0, fmt.Errorf("ProductUseCase.Create: %w", err)
	}
	return productID, nil
}

func (u *ProductUseCase) List(ctx context.Context, limit *int, offset *int) ([]domain.ProductResponse, error) {
	products, err := u.productRepo.List(ctx, limit, offset)
	if err != nil {
		return nil, fmt.Errorf("ProductUseCase.List: %w", err)
	}
	return u.makeResponseList(ctx, products)
}

func (u *ProductUseCase) GetByID(ctx context.Context, id int) (domain.ProductResponse, error) {
	product, err := u.productRepo.GetByID(ctx, id)
	if err != nil {
		return domain.ProductResponse{}, fmt.Errorf("ProductUseCase.GetByID: %w", err)
	}
	images, err := u.productImageUseCase.GetByProductID(ctx, product.ID)
	if err != nil {
		return domain.ProductResponse{}, fmt.Errorf("productImageUseCase.GetByProductID: %w", err)
	}
	return toProductResponse(product, images), nil
}

func (u *ProductUseCase) GetByName(ctx context.Context, name string, limit *int, offset *int) ([]domain.ProductResponse, error) {
	products, err := u.productRepo.GetByName(ctx, name, limit, offset)
	if err != nil {
		return nil, fmt.Errorf("ProductUseCase.GetByName: %w", err)
	}
	return u.makeResponseList(ctx, products)
}

func (u *ProductUseCase) GetByFilters(ctx context.Context, f domain.ProductFilters, limit *int, offset *int) ([]domain.ProductResponse, error) {
	products, err := u.productRepo.GetByFilter(ctx, f, limit, offset)
	if err != nil {
		return nil, fmt.Errorf("ProductUseCase.GetByFilters: %w", err)
	}
	return u.makeResponseList(ctx, products)
}

func (u *ProductUseCase) Delete(ctx context.Context, id int) error {
	if err := u.productRepo.Delete(ctx, id); err != nil {
		return fmt.Errorf("ProductUseCase.Delete: %w", err)
	}
	return nil
}

func (u *ProductUseCase) Update(ctx context.Context, productID int, dto domain.ProductDTO) (int, error) {
	id, err := u.productRepo.Update(ctx, productID, toProductFromDTO(dto))
	if err != nil {
		return 0, fmt.Errorf("ProductUseCase.Update: %w", err)
	}
	return id, nil
}
