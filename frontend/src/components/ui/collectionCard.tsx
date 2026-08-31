"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export interface CollectionItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  imageUrl: string;
  aspectRatio?: string;
}

interface CollectionCardProps {
  item: CollectionItem;
  onClick?: () => void;
}

export default function CollectionCard({ item, onClick }: CollectionCardProps) {
  return (
    <motion.div
      whileHover="hover"
      onClick={onClick}
      className={`group relative overflow-hidden rounded-xl bg-walnut/5 cursor-pointer ${
        item.aspectRatio || "aspect-[16/11]"
      } w-full`}
    >
      <motion.div
        variants={{
          hover: { scale: 1.04 },
        }}
        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        className="relative w-full h-full"
      >
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-walnut/90 via-walnut/25 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

      <div className="absolute inset-0 p-5 lg:p-6 flex flex-col justify-between text-cream z-10">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-medium tracking-[0.15em] uppercase bg-cream/10 backdrop-blur-md border border-cream/15 px-2.5 py-1 rounded-full">
            {item.category}
          </span>
        </div>

        <div>
          <h3 className="font-display text-xl lg:text-2xl font-[300] tracking-wide text-cream mb-0.5 group-hover:translate-x-1 transition-transform duration-300">
            {item.title}
          </h3>
          <p className="text-cream/75 text-xs font-light tracking-wide">
            {item.subtitle}
          </p>
        </div>
      </div>
    </motion.div>
  );
}