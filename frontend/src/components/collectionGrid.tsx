"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./ui/button";
import { CATEGORIES, PRODUCTS, Product } from "@/lib/data";
import { formatSlug } from "@/lib/utils";

function CollectionItemCard({ item }: { item: Product }) {
  const [isLoaded, setIsLoaded] = useState(false);

  const mainImageUrl =
    item.imageUrl ||
    item.images?.find((img) => img.isMain)?.imageUrl ||
    item.images?.[0]?.imageUrl ||
    "/placeholder.jpg";

  const productSlug = formatSlug(item.name);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
      className="flex flex-col items-center text-center w-full"
    >
      <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-wide italic mb-6 text-stone-900">
        <Link href={`/catalog/${productSlug}`} className="hover:opacity-80 transition-opacity">
          {item.name}
        </Link>
      </h3>

      <div className="relative w-full max-w-[1400px] aspect-[16/9] sm:aspect-[2/1] lg:aspect-[2.4/1] bg-[#f0f0f0] overflow-hidden group">
        {!isLoaded && (
          <div className="absolute inset-0 z-0 bg-stone-200 animate-pulse flex items-center justify-center">
            <div className="w-12 h-12 border-2 border-stone-400 border-t-black rounded-full animate-spin" />
          </div>
        )}

        <Link
          href={`/catalog/${productSlug}`}
          className="absolute inset-0 z-10 block w-full h-full cursor-pointer"
          aria-label={item.name}
        >
          <Image
            src={mainImageUrl}
            alt={item.name}
            fill
            sizes="(max-width: 1400px) 100vw, 1400px"
            onLoad={() => setIsLoaded(true)}
            className={`object-cover object-center transition-all duration-500 group-hover:scale-105 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            priority
          />
        </Link>

        <div
          className={`absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 transition-opacity duration-300 pointer-events-auto ${
            isLoaded ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <Button href={`/catalog/${productSlug}`}>
            Подробнее
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default function CollectionGrid() {
  const [activeCategoryId, setActiveCategoryId] = useState<number | string>(
    CATEGORIES[0].id
  );

  const activeProducts = PRODUCTS.filter(
    (product) => String(product.categoryId) === String(activeCategoryId)
  ).slice(0, 3);

  const scrollTabs = (direction: "left" | "right") => {
    const container = document.getElementById("collections-scroll-container");
    if (container) {
      const scrollAmount = direction === "left" ? -160 : 160;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-[#ffffff] text-[#111]">
      <div className="max-w-[1330px] mx-auto px-4">
        <div id="collections" className="relative w-full mb-12 sm:mb-20 scroll-mt-24">
          <button
            onClick={() => scrollTabs("left")}
            aria-label="Скролл влево"
            className="sm:hidden absolute left-0 top-0 bottom-3 z-10 flex items-center justify-center w-8 bg-gradient-to-r from-white via-white/90 to-transparent text-stone-700 active:scale-90 transition-transform cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          <div 
            id="collections-scroll-container"
            className="w-full overflow-x-auto no-scrollbar border-b border-stone-200 pb-3 px-8 sm:px-0"
          >
            <div className="flex items-center justify-between w-full min-w-[700px] gap-4">
              {CATEGORIES.map((category) => {
                const isActive = String(activeCategoryId) === String(category.id);
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategoryId(category.id)}
                    className={`relative pb-3 text-sm sm:text-base tracking-wide transition-colors duration-200 cursor-pointer whitespace-nowrap text-center ${
                      isActive ? "text-black font-semibold" : "text-stone-400 hover:text-stone-700 font-normal"
                    }`}
                  >
                    {category.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeUnderline"
                        className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-black"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => scrollTabs("right")}
            aria-label="Скролл вправо"
            className="sm:hidden absolute right-0 top-0 bottom-3 z-10 flex items-center justify-center w-8 bg-gradient-to-l from-white via-white/90 to-transparent text-stone-700 active:scale-90 transition-transform cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        <AnimatePresence mode="wait">
          <div key={String(activeCategoryId)} className="flex flex-col gap-20 sm:gap-28">
            {activeProducts.map((item) => (
              <CollectionItemCard key={item.id} item={item} />
            ))}
          </div>
        </AnimatePresence>

        <div className="mt-20 sm:mt-28 pt-10 border-t border-stone-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-4">
            <p className="font-serif text-lg sm:text-2xl text-stone-800 font-light text-center sm:text-left">
              Полная коллекция предметов интерьера
            </p>
            <Link 
              href="/catalog" 
              className="group inline-flex items-center gap-3 text-sm tracking-widest uppercase text-stone-900 font-medium hover:text-stone-600 transition-colors"
            >
              <span>Смотреть весь каталог</span>
              <span className="text-base transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}