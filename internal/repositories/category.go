package repositories

import (
	"context"
	"fmt"
	"furniture/internal/domain"

	"github.com/jmoiron/sqlx"
)

type CategoryRepositoryItf interface {
	Insert(ctx context.Context, category domain.Category) (int, error)
	List(ctx context.Context, limit *int, offset *int) ([]domain.Category, error)
	GetByID(ctx context.Context, id int) (domain.Category, error)
	GetByName(ctx context.Context, name string, limit *int, offset *int) ([]domain.Category, error) // НУЖНО БУДЕТ УЛУЧШИТЬ В ПОИСК ПО ТРИГРАММАМ
	GetByParentID(ctx context.Context, parentID *int, limit *int, offset *int) ([]domain.Category, error)
	Update(ctx context.Context, id int, category domain.Category) error
	Delete(ctx context.Context, id int) error
}

type CategoryRepository struct{ db *sqlx.DB }

func NewCategoryRepository(db *sqlx.DB) CategoryRepositoryItf { return CategoryRepository{db: db} }

func (r CategoryRepository) Insert(ctx context.Context, category domain.Category) (int, error) {
	var id int
	query := `INSERT INTO category (name, parent_id) VALUES ($1, $2) RETURNING id`
	err := r.db.QueryRowContext(ctx, query, category.Name, category.ParentID).Scan(&id)
	if err != nil {
		return 0, fmt.Errorf("CategoryRepository.Insert: %w", handleDBError(err))
	}
	return id, nil
}

func (r CategoryRepository) List(ctx context.Context, limit *int, offset *int) ([]domain.Category, error) {
	var categories []domain.Category
	query := `SELECT id, name, parent_id FROM category ORDER BY id`
	args := []any{}
	if limit != nil {
		query += ` LIMIT $1`
		args = append(args, *limit)
	}
	if offset != nil {
		query += fmt.Sprintf(` OFFSET $%d`, len(args)+1)
		args = append(args, *offset)
	}
	err := r.db.SelectContext(ctx, &categories, query, args...)
	if err != nil {
		return nil, fmt.Errorf("CategoryRepository.List: %w", handleDBError(err))
	}
	return categories, nil
}

func (r CategoryRepository) GetByID(ctx context.Context, id int) (domain.Category, error) {
	var category domain.Category
	query := `SELECT id, name, parent_id FROM category WHERE id = $1`
	err := r.db.QueryRowContext(ctx, query, id).Scan(&category.ID, &category.Name, &category.ParentID)
	if err != nil {
		return domain.Category{}, fmt.Errorf("CategoryRepository.GetByID: %w", handleDBError(err))
	}
	return category, nil
}

func (r CategoryRepository) GetByName(ctx context.Context, name string, limit *int, offset *int) ([]domain.Category, error) {
	var categories []domain.Category
	query := `SELECT id, name, parent_id FROM category WHERE name = $1`
	query, args := addPagination(query, []any{name}, limit, offset)
	err := r.db.SelectContext(ctx, &categories, query, args...)
	if err != nil {
		return nil, fmt.Errorf("CategoryRepository.GetByName: %w", handleDBError(err))
	}
	return categories, nil
}

func (r CategoryRepository) GetByParentID(ctx context.Context, parentID *int, limit *int, offset *int) ([]domain.Category, error) {
	var categories []domain.Category
	args := []any{}
	query := `SELECT id, name, parent_id FROM category`
	if parentID != nil {
		query += ` WHERE parent_id = $1`
		args = append(args, *parentID)
	} else {
		query += ` WHERE parent_id IS NULL`
	}
	query, args = addPagination(query, args, limit, offset)
	err := r.db.SelectContext(ctx, &categories, query, args...)
	if err != nil {
		return nil, fmt.Errorf("CategoryRepository.GetByParentID: %w", handleDBError(err))
	}
	return categories, nil
}

func (r CategoryRepository) Update(ctx context.Context, id int, category domain.Category) error {
	query := `UPDATE category SET name = $1, parent_id = $2 WHERE id = $3 RETURNING id`
	err := r.db.QueryRowContext(ctx, query, category.Name, category.ParentID, id).Scan(&category.ID)
	if err != nil {
		return fmt.Errorf("CategoryRepository.Update: %w", handleDBError(err))
	}
	return nil
}

func (r CategoryRepository) Delete(ctx context.Context, id int) error {
	query := `DELETE FROM category WHERE id = $1`
	result, err := r.db.ExecContext(ctx, query, id)
	if err != nil {
		return fmt.Errorf("CategoryRepository.Delete: %w", handleDBError(err))
	}
	rows, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("CategoryRepository.Delete: %w", err)
	}
	if rows == 0 {
		return fmt.Errorf("%w: category %d", domain.ErrNotFound, id)
	}
	return nil
}
