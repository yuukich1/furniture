"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "@/lib/data";
import { formatSlug } from "@/lib/utils";

interface CatalogProductCardProps {
  product: Product;
}

export default function CatalogProductCard({ product }: CatalogProductCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const mainImageUrl =
    product.imageUrl ||
    product.images?.find((img) => img.isMain)?.imageUrl ||
    product.images?.[0]?.imageUrl ||
    "/placeholder.jpg";

  const formattedPrice = product.price
    ? new Intl.NumberFormat("ru-RU").format(product.price)
    : null;

  const productSlug = formatSlug(product.name);

  return (
    <div
      id={`product-${product.id}`}
      className="group flex flex-col h-full w-full scroll-mt-36"
    >
      <div className="relative w-full aspect-[16/10] bg-white overflow-hidden rounded-sm">
        {!isLoaded && (
          <div className="absolute inset-0 bg-parchment/30 animate-pulse" />
        )}

        <motion.div
          layoutId={`product-image-${product.id}`}
          className="relative w-full h-full"
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={mainImageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            onLoad={() => setIsLoaded(true)}
            className={`object-cover object-center transition-all duration-500 group-hover:scale-105 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </motion.div>

        <Link
          href={`/catalog/${productSlug}`}
          className="absolute inset-0 z-10"
          aria-label={product.name}
        />
      </div>

      <div className="flex flex-col flex-1 pt-5 pb-2">
        <h3 className="text-xl sm:text-2xl font-medium tracking-wide text-walnut uppercase mb-2 group-hover:text-terra transition-colors line-clamp-1">
          <Link href={`/catalog/${productSlug}`}>
            {product.name}
          </Link>
        </h3>

        {product.description && (
          <p className="text-xs sm:text-sm text-warm-gray font-light leading-relaxed line-clamp-3 mb-4">
            {product.description}
          </p>
        )}

        <div className="mt-auto text-sm sm:text-base text-walnut">
          {formattedPrice ? (
            <>
              <span className="text-warm-gray text-xs font-light mr-1">от</span>
              <span className="font-semibold">{formattedPrice} ₽</span>
            </>
          ) : (
            <span className="font-semibold text-warm-gray">Цена по запросу</span>
          )}
        </div>
      </div>
    </div>
  );
}