"use client";

import { useState, useRef } from "react";
import { CATEGORIES, PRODUCTS } from "@/lib/data";

import HeaderCatalogMobile from "./headerCatMobile";
import HeaderCatalogDesktop from "./headerCatDesk";
import { SITE_CONFIG } from "@/cfg/site";

interface HeaderCatalogProps {
  activeCategoryId?: number | string;
  onSelectCategory?: (id: number | string) => void;
  productName?: string;
}

export default function HeaderCatalog({
  activeCategoryId,
  onSelectCategory,
  productName,
}: HeaderCatalogProps) {
  const [internalCategoryId, setInternalCategoryId] = useState<number | string>(
    activeCategoryId ?? CATEGORIES[0].id
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isControlled = onSelectCategory !== undefined;
  const currentCategoryId = isControlled 
    ? (activeCategoryId ?? internalCategoryId) 
    : internalCategoryId;

  const [direction, setDirection] = useState<number>(1);
  const prevCategoryIndexRef = useRef<number>(
    CATEGORIES.findIndex((c) => String(c.id) === String(currentCategoryId))
  );

  const handleCategoryChange = (id: number | string) => {
    const newIndex = CATEGORIES.findIndex((c) => String(c.id) === String(id));
    const currentIndex = prevCategoryIndexRef.current;

    if (newIndex !== currentIndex) {
      setDirection(newIndex > currentIndex ? 1 : -1);
      prevCategoryIndexRef.current = newIndex;
    }

    setInternalCategoryId(id);
    
    if (onSelectCategory) {
      onSelectCategory(id);
    }
  };

  const scrollToProduct = (productId: number | string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(`product-${productId}`);
    if (element) {
      const offset = 140;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const activeCategoryName = CATEGORIES.find(
    (c) => String(c.id) === String(currentCategoryId)
  )?.name;

  const subItems = PRODUCTS.filter(
    (product) => String(product.categoryId) === String(currentCategoryId)
  );

  return (
    <header className="sticky top-0 z-40 w-full bg-cream/95 backdrop-blur-md border-b border-muted/50 transition-colors">
      <HeaderCatalogMobile
        brandName={SITE_CONFIG.name}
        categories={CATEGORIES}
        currentCategoryId={currentCategoryId}
        activeCategoryName={activeCategoryName}
        subItems={subItems}
        isOpen={isMobileMenuOpen}
        onOpen={() => setIsMobileMenuOpen(true)}
        onClose={() => setIsMobileMenuOpen(false)}
        onSelectCategory={handleCategoryChange}
        onScrollToProduct={scrollToProduct}
        productName={productName}
      />

      <HeaderCatalogDesktop
        brandName={SITE_CONFIG.name}
        categories={CATEGORIES}
        currentCategoryId={currentCategoryId}
        subItems={subItems}
        direction={direction}
        productName={productName}
        onSelectCategory={handleCategoryChange}
        onScrollToProduct={scrollToProduct}
      />
    </header>
  );
}