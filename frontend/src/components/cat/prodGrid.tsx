"use client";


import { Product } from "@/lib/data";
import CatalogProductCard from "./catProdCard";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="w-full py-20 text-center text-warm-gray font-light">
        В этой категории пока нет товаров
      </div>
    );
  }

  return (
    <section className="w-full py-8 sm:py-12">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-16">
          {products.map((product) => (
            <CatalogProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}