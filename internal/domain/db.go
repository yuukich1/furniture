package domain

import "time"

type Category struct {
	ID       int    `db:"id"`
	Name     string `db:"name"`
	ParentID *int   `db:"parent_id"`
}

type Product struct {
	ID          int       `db:"id"`
	CategoryID  int       `db:"category_id"`
	Name        string    `db:"name"`
	Description *string   `db:"description"`
	Price       float64   `db:"price"`
	Stock       int       `db:"stock"`
	Weight      *int      `db:"weight"`
	Height      *int      `db:"height"`
	Depth       *int      `db:"depth"`
	Material    *string   `db:"material"`
	Color       *string   `db:"color"`
	CreatedAt   time.Time `db:"created_at"`
}

type ProductImage struct {
	ID        int    `db:"id"`
	ProductID int    `db:"product_id"`
	ImageUrl  string `db:"image_url"`
	IsMain    bool   `db:"is_main"`
}
