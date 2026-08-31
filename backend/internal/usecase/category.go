package usecase

import (
	"context"
	"fmt"

	"furniture/internal/domain"
	"furniture/internal/repositories"
)

type CategoryUseCaseItf interface {
	Create(ctx context.Context, dto domain.CategoryDTO) (int, error)
	List(ctx context.Context, limit *int, offset *int) ([]domain.CategoryResponse, error)
	GetByID(ctx context.Context, categoryID int) (domain.CategoryResponse, error)
	GetByParentID(ctx context.Context, parentID *int, limit *int, offset *int) ([]domain.CategoryResponse, error)
	Update(ctx context.Context, id int, dto domain.CategoryDTO) error
	Delete(ctx context.Context, id int) error
}

type CategoryUseCase struct {
	categoryRepo repositories.CategoryRepositoryItf
}

func NewCategoryUseCase(categoryRepo repositories.CategoryRepositoryItf) CategoryUseCaseItf {
	return &CategoryUseCase{categoryRepo: categoryRepo}
}

func toCategoryResponse(category domain.Category) domain.CategoryResponse {
	return domain.CategoryResponse{
		ID:       category.ID,
		Name:     category.Name,
		ParentID: category.ParentID,
	}
}

func toCategoryFromDTO(dto domain.CategoryDTO) domain.Category {
	return domain.Category{
		Name:     dto.Name,
		ParentID: dto.ParentID,
	}
}

func (u CategoryUseCase) makeResponseList(categories []domain.Category) []domain.CategoryResponse {
	result := make([]domain.CategoryResponse, 0, len(categories))

	for _, category := range categories {
		result = append(result, toCategoryResponse(category))
	}

	return result
}

func (u CategoryUseCase) Create(ctx context.Context, dto domain.CategoryDTO) (int, error) {
	categoryID, err := u.categoryRepo.Insert(ctx, toCategoryFromDTO(dto))
	if err != nil {
		return 0, fmt.Errorf("CategoryUseCase.Create: %w", err)
	}

	return categoryID, nil
}

func (u CategoryUseCase) List(ctx context.Context, limit *int, offset *int) ([]domain.CategoryResponse, error) {
	categories, err := u.categoryRepo.List(ctx, limit, offset)
	if err != nil {
		return nil, fmt.Errorf("CategoryUseCase.List: %w", err)
	}

	return u.makeResponseList(categories), nil
}

func (u CategoryUseCase) GetByID(ctx context.Context, categoryID int) (domain.CategoryResponse, error) {
	category, err := u.categoryRepo.GetByID(ctx, categoryID)
	if err != nil {
		return domain.CategoryResponse{}, fmt.Errorf("CategoryUseCase.GetByID: %w", err)
	}

	return toCategoryResponse(category), nil
}

func (u CategoryUseCase) GetByParentID(ctx context.Context, parentID *int, limit *int, offset *int) ([]domain.CategoryResponse, error) {
	categories, err := u.categoryRepo.GetByParentID(ctx, parentID, limit, offset)
	if err != nil {
		return nil, fmt.Errorf("CategoryUseCase.GetByParentID: %w", err)
	}
	return u.makeResponseList(categories), nil
}

func (u CategoryUseCase) Update(ctx context.Context, id int, dto domain.CategoryDTO) error {
	if err := u.categoryRepo.Update(ctx, id, toCategoryFromDTO(dto)); err != nil {
		return fmt.Errorf("CategoryUseCase.Update: %w", err)
	}

	return nil
}

func (u CategoryUseCase) Delete(ctx context.Context, id int) error {
	if err := u.categoryRepo.Delete(ctx, id); err != nil {
		return fmt.Errorf("CategoryUseCase.Delete: %w", err)
	}
	return nil
}
