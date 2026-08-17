package repositories

import (
	"context"
	"fmt"
	"furniture/internal/domain"
	"strings"

	"github.com/jmoiron/sqlx"
)

type ProductRepositoryItf interface {
	Insert(ctx context.Context, product domain.Product) (int, error)
	List(ctx context.Context, limit *int, offset *int) ([]domain.Product, error)
	Update(ctx context.Context, id int, product domain.Product) (int, error)
	Delete(ctx context.Context, productID int) error
	GetByID(ctx context.Context, id int) (domain.Product, error)
	GetByCategoryID(ctx context.Context, categoryID int, limit *int, offset *int) ([]domain.Product, error)
	GetByName(ctx context.Context, name string, limit *int, offset *int) ([]domain.Product, error)
	GetByFilter(ctx context.Context, f domain.ProductFilters, limit *int, offset *int) ([]domain.Product, error)
}

type ProductRepository struct{ db *sqlx.DB }

func NewProductRepository(db *sqlx.DB) ProductRepositoryItf { return ProductRepository{db: db} }

func (r ProductRepository) Insert(ctx context.Context, product domain.Product) (int, error) {
	var id int
	query := `INSERT INTO products (category_id, name, description, price, stock, weight, height, depth, material, color) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`
	err := r.db.QueryRowxContext(
		ctx,
		query,
		product.CategoryID,
		product.Name,
		product.Description,
		product.Price,
		product.Stock,
		product.Weight,
		product.Height,
		product.Depth,
		product.Material,
		product.Color,
	).Scan(&id)
	if err != nil {
		return 0, fmt.Errorf("ProductRepository.Insert: %w", err)
	}
	return id, nil
}

func (r ProductRepository) List(ctx context.Context, limit *int, offset *int) ([]domain.Product, error) {
	var products []domain.Product
	query := `SELECT id, category_id, name, description, price, stock, weight, height, depth, material, color FROM products`
	query, args := addPagination(query, []any{}, limit, offset)
	err := r.db.SelectContext(ctx, &products, query, args...)
	if err != nil {
		return nil, fmt.Errorf("ProductRepository.List: %w", err)
	}
	return products, nil
}

func (r ProductRepository) Update(ctx context.Context, id int, product domain.Product) (int, error) {
	query := `UPDATE products SET category_id=$2, name=$3, description=$4, price=$5, stock=$6, weight=$7, height=$8, depth=$9, material=$10, color=$11 WHERE id = $1 RETURNING id`
	err := r.db.QueryRowxContext(
		ctx,
		query,
		id,
		product.CategoryID,
		product.Name,
		product.Description,
		product.Price,
		product.Stock,
		product.Weight,
		product.Height,
		product.Depth,
		product.Material,
		product.Color,
	).Scan(&product.ID)
	if err != nil {
		return 0, fmt.Errorf("ProductRepository.Update: %w", err)
	}
	return product.ID, nil
}

func (r ProductRepository) Delete(ctx context.Context, productID int) error {
	query := `DELETE FROM products WHERE id = $1`
	_, err := r.db.ExecContext(ctx, query, productID)
	if err != nil {
		return fmt.Errorf("ProductRepository.Delete: %w", err)
	}
	return nil
}

func (r ProductRepository) GetByID(ctx context.Context, id int) (domain.Product, error) {
	var product domain.Product
	query := `SELECT id, category_id, name, description, price, stock, weight, height, depth, material, color FROM products WHERE id = $1`
	err := r.db.GetContext(ctx, &product, query, id)
	if err != nil {
		return domain.Product{}, fmt.Errorf("ProductRepository.GetByID: %w", err)
	}
	return product, nil
}

func (r ProductRepository) GetByCategoryID(ctx context.Context, categoryID int, limit *int, offset *int) ([]domain.Product, error) {
	var products []domain.Product
	query := `SELECT id, category_id, name, description, price, stock, weight, height, depth, material, color FROM products WHERE category_id = $1`
	query, args := addPagination(query, []any{categoryID}, limit, offset)
	err := r.db.SelectContext(ctx, &products, query, args...)
	if err != nil {
		return nil, fmt.Errorf("ProductRepository.GetByCategoryID: %w", err)
	}
	return products, nil
}

func (r ProductRepository) GetByName(ctx context.Context, name string, limit *int, offset *int) ([]domain.Product, error) {
	var products []domain.Product
	query := `SELECT id, category_id, name, description, price, stock, weight, height, depth, material, color FROM products WHERE name = $1`
	query, args := addPagination(query, []any{name}, limit, offset)
	err := r.db.SelectContext(ctx, &products, query, args...)
	if err != nil {
		return nil, fmt.Errorf("ProductRepository.GetByName: %w", err)
	}
	return products, nil
}

func applyFilters(query string, f domain.ProductFilters) (string, []any) {
	args := []any{}
	where := []string{}
	intFilters := []struct {
		value  *int
		column string
		op     string
	}{
		{f.ToPrice, "price", "<="},
		{f.FromPrice, "price", ">="},
		{f.Depth, "depth", "="},
		{f.Height, "height", "="},
		{f.Weight, "weight", "="},
	}

	for _, filter := range intFilters {
		if filter.value != nil {
			where = append(where, fmt.Sprintf("%s %s $%d", filter.column, filter.op, len(args)+1))
			args = append(args, *filter.value)
		}
	}

	strFilter := []struct {
		value  *string
		column string
	}{
		{f.Material, "material"},
		{f.Color, "color"},
	}
	for _, filter := range strFilter {
		if filter.value != nil {
			where = append(where, fmt.Sprintf("%s = $%d", filter.column, len(args)+1))
			args = append(args, *filter.value)
		}
	}
	if len(where) > 0 {
		query += " WHERE " + strings.Join(where, " AND ")
	}
	return query, args
}

func (r ProductRepository) GetByFilter(ctx context.Context, f domain.ProductFilters, limit *int, offset *int) ([]domain.Product, error) {
	var products []domain.Product
	var args []any
	query := `SELECT id, category_id, name, description, price, stock, weight, height, depth, material, color FROM products`
	query, args = applyFilters(query, f)
	query, args = addPagination(query, args, limit, offset)
	err := r.db.SelectContext(ctx, &products, query, args...)
	if err != nil {
		return nil, fmt.Errorf("ProductRepository.GetByFilter: %w", err)
	}
	return products, nil
}
