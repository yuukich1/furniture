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
	Update(ctx context.Context, id int, dto domain.CategoryDTO) error
	Delete(ctx context.Context, id int) error
}

type CategoryUseCase struct {
	categoryRepo repositories.CategoryRepositoryItf
}

func NewCategoryUseCase(categoryRepo repositories.CategoryRepositoryItf) CategoryUseCaseItf {
	return CategoryUseCase{categoryRepo: categoryRepo}
}

func (u CategoryUseCase) Create(ctx context.Context, dto domain.CategoryDTO) (int, error) {
	category := domain.Category{
		Name:     dto.Name,
		ParentID: dto.ParentID,
	}
	id, err := u.categoryRepo.Insert(ctx, category)
	if err != nil {
		return 0, fmt.Errorf("CategoryUseCase.Create: %w", err)
	}
	return id, nil
}

func (u CategoryUseCase) List(ctx context.Context, limit *int, offset *int) ([]domain.CategoryResponse, error) {
	categories, err := u.categoryRepo.List(ctx, limit, offset)
	if err != nil {
		return nil, fmt.Errorf("CategoryUseCase.List: %w", err)
	}
	result := make([]domain.CategoryResponse, len(categories))
	for _, category := range categories {
		result = append(result, domain.CategoryResponse{
			ID:       category.ID,
			Name:     category.Name,
			ParentID: category.ParentID,
		})
	}
	return result, nil
}

func (u CategoryUseCase) GetByID(ctx context.Context, categoryID int) (domain.CategoryResponse, error) {
	category, err := u.categoryRepo.GetByID(ctx, categoryID)
	if err != nil {
		return domain.CategoryResponse{}, fmt.Errorf("CategoryUseCase.GetByID: %w", err)
	}
	return domain.CategoryResponse{
		ID:       category.ID,
		Name:     category.Name,
		ParentID: category.ParentID,
	}, nil
}

func (u CategoryUseCase) Update(ctx context.Context, id int, dto domain.CategoryDTO) error {
	err := u.categoryRepo.Update(ctx, id, domain.Category{
		Name:     dto.Name,
		ParentID: dto.ParentID,
	})
	if err != nil {
		return fmt.Errorf("CategoryUseCase.Update: %w", err)
	}
	return nil
}

func (u CategoryUseCase) Delete(ctx context.Context, id int) error {
	err := u.categoryRepo.Delete(ctx, id)
	if err != nil {
		return fmt.Errorf("CategoryUseCase.Delete: %w", err)
	}
	return nil
}
