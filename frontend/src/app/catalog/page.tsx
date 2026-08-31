"use client";

import { useState } from "react";

import { CATEGORIES, PRODUCTS } from "@/lib/data";
import HeaderCatalog from "@/components/cat/headerCat";
import ProductGrid from "@/components/cat/prodGrid";

export default function CatalogPage() {
  const [activeCategoryId, setActiveCategoryId] = useState<number | string>(
    CATEGORIES[0].id
  );

  const filteredProducts = PRODUCTS.filter(
    (product) => String(product.categoryId) === String(activeCategoryId)
  );

  return (
    <div className="min-h-screen bg-white">
      <HeaderCatalog
        activeCategoryId={activeCategoryId}
        onSelectCategory={setActiveCategoryId}
      />
      
      <main>
        <ProductGrid products={filteredProducts} />
      </main>
    </div>
  );
}