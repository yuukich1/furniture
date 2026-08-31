package domain

type ProductFilters struct {
	Name      *string
	FromPrice *int
	ToPrice   *int
	Weight    *int
	Height    *int
	Depth     *int
	Material  *string
	Color     *string
}

type CategoryDTO struct {
	Name     string `json:"name"`
	ParentID *int   `json:"parent_id"`
}

type CategoryResponse struct {
	ID       int    `json:"id"`
	Name     string `json:"name"`
	ParentID *int   `json:"parent_id"`
}

type ProductDTO struct {
	CategoryID  int     `json:"category_id"`
	Name        string  `json:"name"`
	Description *string `json:"description"`
	Price       float64 `json:"price"`
	Stock       int     `json:"stock"`
	Weight      *int    `json:"weight"`
	Height      *int    `json:"height"`
	Depth       *int    `json:"depth"`
	Material    *string `json:"material"`
	Color       *string `json:"color"`
}

type ProductImageResponse struct {
	ID     int    `json:"id"`
	URL    string `json:"url"`
	IsMain bool   `json:"is_main"`
}

type ProductResponse struct {
	ID          int                    `json:"id"`
	CategoryID  int                    `json:"category_id"`
	Name        string                 `json:"name"`
	Description *string                `json:"description"`
	Price       float64                `json:"price"`
	Stock       int                    `json:"stock"`
	Weight      *int                   `json:"weight"`
	Height      *int                   `json:"height"`
	Depth       *int                   `json:"depth"`
	Material    *string                `json:"material"`
	Color       *string                `json:"color"`
	Images      []ProductImageResponse `json:"images"`
}

type ProductImageDTO struct {
	ProductID int    `json:"product_id"`
	URL       string `json:"url"`
	IsMain    bool   `json:"is_main"`
}

type ProductImageSetMainDTO struct {
	ProductID      int `json:"product_id"`
	ProductImageID int `json:"product_image_id"`
}
