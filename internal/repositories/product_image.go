package repositories

import (
	"context"
	"fmt"
	"furniture/internal/domain"

	"github.com/jmoiron/sqlx"
)

type ProductImageRepositoryItf interface {
	Insert(ctx context.Context, productImage domain.ProductImage) (int, error)
	GetByProductID(ctx context.Context, productID int) ([]domain.ProductImage, error)
	Delete(ctx context.Context, productImageID int) error
}

type ProductImageRepository struct{ db *sqlx.DB }

func NewProductImageRepository(db *sqlx.DB) ProductImageRepositoryItf {
	return ProductImageRepository{db: db}
}

func (r ProductImageRepository) Insert(ctx context.Context, productImage domain.ProductImage) (int, error) {
	var id int
	query := `INSERT INTO product_image (product_id, image_url, is_main) VALUES ($1, $2, $3) RETURNING id`
	err := r.db.QueryRowContext(ctx, query, productImage.ProductID, productImage.ImageUrl, productImage.IsMain).Scan(&id)
	if err != nil {
		return 0, fmt.Errorf("ProductImageRepository.Insert: %w", err)
	}
	return id, nil
}

func (r ProductImageRepository) GetByProductID(ctx context.Context, productID int) ([]domain.ProductImage, error) {
	var productImage []domain.ProductImage
	query := `SELECT id, product_id, image_url, is_main from product_image WHERE product_id = $1`
	err := r.db.SelectContext(ctx, &productImage, query, productID)
	if err != nil {
		return nil, fmt.Errorf("ProductImageRepository.GetByProductID: %w", err)
	}
	return productImage, nil
}

func (r ProductImageRepository) Delete(ctx context.Context, productImageID int) error {
	query := `DELETE FROM product_image WHERE id = $1`
	_, err := r.db.ExecContext(ctx, query, productImageID)
	if err != nil {
		return fmt.Errorf("ProductImageRepository.Delete: %w", err)
	}
	return nil
}
