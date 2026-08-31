"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderCatalogDesktopProps {
  brandName: string; 
  categories: any[];
  currentCategoryId: number | string;
  subItems: any[];
  direction: number;
  productName?: string; 
  onSelectCategory: (id: number | string) => void;
  onScrollToProduct?: (id: number | string) => void;
}

export default function HeaderCatalogDesktop({
  brandName,
  categories,
  currentCategoryId,
  subItems,
  direction,
  productName,
  onSelectCategory,
  onScrollToProduct,
}: HeaderCatalogDesktopProps) {
  const backHref = productName ? "/catalog" : "/";

  return (
    <div className="hidden md:flex flex-col w-full">
      <div className="flex items-center justify-between w-full relative py-4 px-12 max-w-[1720px] mx-auto">
        
        <Link
          href={backHref}
          aria-label={productName ? "Назад в каталог" : "Назад на главную"}
          className="absolute left-0 z-20 flex items-center justify-center w-10 h-10 rounded-full text-bark hover:text-terra transition-all"
        >
          <svg className="w-5 h-5 stroke-[1.75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </Link>

        <div className="flex items-center gap-10 mx-auto">
          <Link href="/" className="font-display text-2xl text-walnut uppercase">
            {brandName}
          </Link>
          <div className="h-4 w-px bg-muted shrink-0" />
          <nav className="flex items-center gap-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onSelectCategory(category.id)}
                className={`text-base transition-colors ${
                  String(currentCategoryId) === String(category.id)
                    ? "text-walnut font-medium"
                    : "text-warm-gray hover:text-walnut"
                }`}
              >
                {category.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="w-full bg-parchment/40 border-t border-muted/40 overflow-hidden min-h-[49px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {productName ? (
            <motion.div
              key="product-name-bar"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25 }}
              className="text-base text-walnut font-medium tracking-wide"
            >
              {productName}
            </motion.div>
          ) : (
            <motion.div
              key={String(currentCategoryId)}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 40 }}
              transition={{ duration: 0.25 }}
              className="flex items-center justify-center gap-8"
            >
              {subItems.map((product) => (
                <button
                  key={product.id}
                  onClick={() => onScrollToProduct?.(product.id)}
                  className="text-base text-warm-gray hover:text-terra transition-colors"
                >
                  {product.name}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}