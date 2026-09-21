"use client";

import Image from "next/image";
import { SITE_CONFIG } from "@/cfg/site";

interface HeroProps {
  bgImageUrl?: string;
}

export default function Hero({
  bgImageUrl = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1800&h=1200&fit=crop&auto=format",
}: HeroProps) {
  return (
    <section className="relative h-[35vh] min-h-[260px] w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImageUrl}
          alt={SITE_CONFIG.name}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 text-center px-4">
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-light tracking-widest text-cream uppercase">
          {SITE_CONFIG.name}
        </h1>
      </div>
    </section>
  );
}