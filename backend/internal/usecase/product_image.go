package usecase

import (
	"context"
	"fmt"
	"furniture/internal/domain"
	"furniture/internal/repositories"
)

type ProductImageUseCaseItf interface {
	Create(ctx context.Context, dto domain.ProductImageDTO) (int, error)
	GetByProductID(ctx context.Context, productID int) ([]domain.ProductImageResponse, error)
	SetMain(ctx context.Context, dto domain.ProductImageSetMainDTO) error
	Delete(ctx context.Context, productImageID int) error
}

type ProductImageUseCase struct {
	productImageRepo repositories.ProductImageRepositoryItf
}

func NewProductImageUseCase(productImageRepo repositories.ProductImageRepositoryItf) ProductImageUseCaseItf {
	return &ProductImageUseCase{productImageRepo: productImageRepo}
}

func toProductImageFromDTO(dto domain.ProductImageDTO) domain.ProductImage {
	return domain.ProductImage{
		ProductID: dto.ProductID,
		ImageUrl:  dto.URL,
		IsMain:    dto.IsMain,
	}
}

func toProductImageResponse(image domain.ProductImage) domain.ProductImageResponse {
	return domain.ProductImageResponse{
		ID:     image.ID,
		URL:    image.ImageUrl,
		IsMain: image.IsMain,
	}
}

func toProductImageResponses(images []domain.ProductImage) []domain.ProductImageResponse {
	result := make([]domain.ProductImageResponse, 0, len(images))
	for _, img := range images {
		result = append(result, toProductImageResponse(img))
	}
	return result
}

func (u *ProductImageUseCase) Create(ctx context.Context, dto domain.ProductImageDTO) (int, error) {
	productImageID, err := u.productImageRepo.Insert(ctx, toProductImageFromDTO(dto))
	if err != nil {
		return 0, fmt.Errorf("productImageRepo.Create: %w", err)
	}
	return productImageID, nil
}

func (u *ProductImageUseCase) GetByProductID(ctx context.Context, productID int) ([]domain.ProductImageResponse, error) {
	images, err := u.productImageRepo.GetByProductID(ctx, productID)
	if err != nil {
		return nil, fmt.Errorf("u.productImageRepo.GetByProductID: %w", err)
	}
	return toProductImageResponses(images), nil

}

func (u *ProductImageUseCase) SetMain(ctx context.Context, dto domain.ProductImageSetMainDTO) error {
	if err := u.productImageRepo.SetMain(ctx, dto.ProductID, dto.ProductImageID); err != nil {
		return fmt.Errorf("u.productImageRepo.SetMain: %w", err)
	}
	return nil
}

func (u *ProductImageUseCase) Delete(ctx context.Context, productImageID int) error {
	if err := u.productImageRepo.Delete(ctx, productImageID); err != nil {
		return fmt.Errorf("productImageRepo.Delete: %w", err)
	}
	return nil
}
