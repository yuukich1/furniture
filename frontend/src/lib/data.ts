import CatetoriesData from "@/data/categories.json"
import ProductsData from "@/data/items.json"

export interface Category {
  id: number;
  name: string;
  slug?: string;
}

export interface ProductImage {
  id: number;
  productId: number;
  imageUrl: string;
  isMain: boolean;
}


export interface ProductDetails {
  width?: string;
  height?: string;
  depth?: string;
  material?: string;
  weight?: string;
  [key: string]: unknown; 
}

export interface Product {
  id: number;
  categoryId: number;
  name: string;
  price?: number;
  description?: string;
  detail?: ProductDetails;
  images?: ProductImage[];
  imageUrl?: string;
}

export const CATEGORIES: Category[] = CatetoriesData;

export const PRODUCTS: Product[] = ProductsData;

export async function getCategories(): Promise<Category[]> {
  return CATEGORIES;
}

export async function getProductsByCategoryId(categoryId: number | string): Promise<Product[]> {
  const numericId = Number(categoryId);
  return PRODUCTS.filter((product) => product.categoryId === numericId);
}

export async function getProductById(id: number | string): Promise<Product | null> {
  const numericId = Number(id);
  return PRODUCTS.find((product) => product.id === numericId) || null;
}