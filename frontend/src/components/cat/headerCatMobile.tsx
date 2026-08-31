"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Category {
  id: number | string;
  name: string;
}

interface Product {
  id: number | string;
  name: string;
  categoryId: number | string;
}

interface HeaderCatalogMobileProps {
  brandName: string;
  categories: Category[];
  currentCategoryId: number | string;
  activeCategoryName?: string;
  subItems: Product[];
  productName?: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSelectCategory: (id: number | string) => void;
  onScrollToProduct: (id: number | string) => void;
}

export default function HeaderCatalogMobile({
  brandName,
  categories,
  currentCategoryId,
  activeCategoryName,
  subItems,
  productName,
  isOpen,
  onOpen,
  onClose,
  onSelectCategory,
  onScrollToProduct,
}: HeaderCatalogMobileProps) {
  const backHref = productName ? "/catalog" : "/";

  return (
    <>
      <div className="relative flex items-center justify-between w-full px-4 py-3 md:hidden min-h-[60px]">
        <Link
          href={backHref}
          aria-label={productName ? "Назад в каталог" : "Назад на главную"}
          className="relative z-20 flex items-center justify-center w-10 h-10 shrink-0 rounded-full text-bark md:hover:text-terra md:hover:bg-parchment/60 active:scale-95 transition-all touch-manipulation"
        >
          <svg
            className="w-6 h-6 stroke-[1.75]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </Link>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center pointer-events-none">
          <Link href="/" className="font-display text-xl text-walnut py-2 px-4 pointer-events-auto uppercase">
            {brandName}
          </Link>
        </div>

        <button
          onClick={onOpen}
          className="relative z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-parchment/80 border border-muted/60 text-walnut text-sm font-medium active:scale-95 transition-all max-w-[130px] shrink-0 touch-manipulation"
        >
          <span className="truncate">
            {productName || activeCategoryName || "Каталог"}
          </span>
          <svg className="w-4 h-4 text-warm-gray shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden"
            />

            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 right-0 z-50 bg-cream max-h-[85vh] rounded-b-2xl shadow-xl overflow-hidden flex flex-col md:hidden"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-muted/50">
                <span className="font-display text-xl text-walnut">Категории</span>
                <button
                  onClick={onClose}
                  className="p-2 text-bark active:text-terra touch-manipulation"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="overflow-y-auto p-5 space-y-6">
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => {
                    const isActive = String(currentCategoryId) === String(category.id);
                    return (
                      <button
                        key={category.id}
                        onClick={() => {
                          onSelectCategory(category.id);
                          onClose();
                        }}
                        className={`p-3 text-left rounded-lg text-sm transition-all touch-manipulation active:scale-95 ${
                          isActive
                            ? "bg-terra text-white font-medium shadow-sm"
                            : "bg-parchment/60 text-walnut md:hover:bg-parchment active:bg-parchment/90"
                        }`}
                      >
                        {category.name}
                      </button>
                    );
                  })}
                </div>

                {subItems.length > 0 && (
                  <div className="pt-2 border-t border-muted/50">
                    <p className="text-xs font-semibold uppercase tracking-wider text-warm-gray mb-3">
                      Товары категории
                    </p>
                    <div className="flex flex-col space-y-1">
                      {subItems.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => {
                            onScrollToProduct(product.id);
                            onClose(); 
                          }}
                          className="text-left py-2 px-3 text-sm text-walnut active:text-terra active:bg-parchment/40 rounded-md transition-colors touch-manipulation"
                        >
                          {product.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}