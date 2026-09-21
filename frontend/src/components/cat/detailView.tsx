"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Product, PRODUCTS } from "@/lib/data";
import { formatSlug } from "@/lib/utils";

interface ProductDetailsViewProps {
  product: Product;
}

const fadeInVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: [0.22, 1, 0.36, 1] as const 
    } 
  }
};

function ImageWithSkeleton({
  src,
  alt,
  fill,
  priority = false,
  className = "",
  sizes,
}: {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && (
        <div className="absolute inset-0 z-0 bg-stone-200 animate-pulse flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-stone-400 border-t-black rounded-full animate-spin" />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        priority={priority}
        sizes={sizes}
        onLoad={() => setIsLoaded(true)}
        className={`object-cover object-center transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } ${className}`}
      />
    </>
  );
}

export default function ProductDetailsView({ product }: ProductDetailsViewProps) {
  const imagesList = product.images?.map((img) => img.imageUrl) || [];
  if (product.imageUrl && !imagesList.includes(product.imageUrl)) {
    imagesList.unshift(product.imageUrl);
  }

  const mainImage = imagesList[0] || "/placeholder.jpg";
  const secondImage = imagesList[1] || mainImage;
  const thirdImage = imagesList[2] || secondImage;
  const galleryImages = imagesList.length > 0 ? imagesList : [mainImage, secondImage, thirdImage];

  const detailLabels: Record<string, string> = {
    width: "Ширина",
    height: "Высота",
    depth: "Глубина",
    material: "Материал",
    weight: "Вес",
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.categoryId === product.categoryId && p.id !== product.id
  ).slice(0, 4);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
      className="w-full pb-12 sm:pb-16"
    >
      <div className="relative w-full h-screen bg-parchment/60 overflow-hidden mb-12 sm:mb-16 md:mb-24">
        <ImageWithSkeleton
          src={mainImage}
          alt={product.name}
          fill
          priority
          sizes="100vw"
        />
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 space-y-16 sm:space-y-24 md:space-y-32">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInVariant}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center"
        >
          <div className="flex flex-col space-y-4 sm:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-wide uppercase text-walnut">
              {product.name}
            </h1>

            {product.description && (
              <p className="text-warm-gray text-base sm:text-lg leading-relaxed font-light">
                {product.description}
              </p>
            )}
          </div>

          <div className="relative aspect-[4/3] w-full bg-parchment/60 rounded-sm overflow-hidden border border-muted/40 shadow-sm">
            <ImageWithSkeleton
              src={secondImage}
              alt={`${product.name} — ракурс 1`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInVariant}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center"
        >
          <div className="relative aspect-[4/3] w-full bg-parchment/60 rounded-sm overflow-hidden border border-muted/40 shadow-sm order-2 md:order-1">
            <ImageWithSkeleton
              src={thirdImage}
              alt={`${product.name} — ракурс 2`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div className="flex flex-col space-y-4 sm:space-y-6 order-1 md:order-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-warm-gray">
              Характеристики изделия
            </h3>

            {product.detail && Object.keys(product.detail).length > 0 ? (
              <div className="grid grid-cols-1 gap-2">
                {Object.entries(product.detail).map(([key, value]) => {
                  if (!value) return null;
                  const label = detailLabels[key] || key;
                  return (
                    <div key={key} className="flex justify-between items-baseline text-sm py-2 border-b border-muted/20">
                      <span className="text-warm-gray font-light">{label}</span>
                      <span className="text-walnut font-medium">{String(value)}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-warm-gray font-light">Характеристики не указаны</p>
            )}
          </div>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInVariant}
          className="w-full space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-warm-gray">
              Галерея
            </h3>
            <span className="hidden lg:flex items-center gap-1.5 text-xs text-warm-gray font-light uppercase tracking-wider">
              Листайте
              <svg className="w-3.5 h-3.5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </span>
          </div>

          <div className="flex overflow-x-auto space-x-4 sm:space-x-6 pb-4 scrollbar-none lg:scrollbar-thin lg:scrollbar-thumb-walnut/30 lg:scrollbar-track-transparent hover:lg:scrollbar-thumb-walnut/60 snap-x snap-mandatory transition-colors duration-300">
            {galleryImages.map((imgUrl, index) => (
              <div 
                key={index} 
                className="relative flex-shrink-0 w-[85vw] sm:w-[500px] aspect-[16/10] bg-parchment/60 rounded-sm overflow-hidden border border-muted/40 snap-start"
              >
                <ImageWithSkeleton
                  src={imgUrl}
                  alt={`${product.name} — галерея ${index + 1}`}
                  fill
                  sizes="500px"
                />
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInVariant}
          className="py-6 sm:py-8 border-y border-muted/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <span className="text-warm-gray text-sm tracking-wider uppercase">
            Стоимость изделия
          </span>
          <div className="text-2xl sm:text-3xl font-semibold text-walnut">
            {product.price
              ? `от ${new Intl.NumberFormat("ru-RU").format(product.price)} ₽`
              : "Цена по запросу"}
          </div>
        </motion.div>

        {relatedProducts.length > 0 && (
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInVariant}
            className="space-y-8"
          >
            <h3 className="text-xl sm:text-2xl font-medium tracking-wide uppercase text-walnut">
              Смотрите также
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((item) => {
                const itemImg = item.imageUrl || item.images?.[0]?.imageUrl || "/placeholder.jpg";
                return (
                  <Link 
                    key={item.id} 
                    href={`/catalog/${formatSlug(item.name)}`}
                    className="group flex flex-col space-y-3"
                  >
                    <div className="relative aspect-[4/3] w-full bg-parchment/60 rounded-sm overflow-hidden border border-muted/40">
                      <ImageWithSkeleton
                        src={itemImg}
                        alt={item.name}
                        fill
                        className="transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-walnut font-medium uppercase tracking-wide group-hover:text-warm-gray transition-colors">
                        {item.name}
                      </span>
                      <span className="text-warm-gray text-sm">
                        {item.price ? `от ${new Intl.NumberFormat("ru-RU").format(item.price)} ₽` : "По запросу"}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </motion.main>
  );
}