"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import Button from "./ui/button";

interface HeroStat {
  value: string;
  label: string;
}

interface HeroProps {
  tagline?: string;
  titleLines?: string[];
  description?: string;
  primaryBtnText?: string;
  secondaryBtnText?: string;
  bgImageUrl?: string;
  stats?: HeroStat[];
}

const DEFAULT_STATS: HeroStat[] = [
  { value: "18", label: "лет мастерства" },
  { value: "240+", label: "реализованных проектов" },
  { value: "100%", label: "натуральные материалы" },
];

const DEFAULT_TITLE_LINES = [
  "Архитектура",
  "вашего",
  "умиротворения"
];

function AnimatedNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  const numericMatch = value.match(/\d+/);
  const targetNumber = numericMatch ? parseInt(numericMatch[0], 10) : 0;
  const suffix = value.replace(/\d+/, "");

  const count = useMotionValue(0);
  const springValue = useSpring(count, {
    duration: 2500,
    bounce: 0,
  });

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      count.set(targetNumber);
    }
  }, [isInView, count, targetNumber]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  return (
    <span ref={ref} className="inline-flex items-baseline">
      {displayValue}
      {suffix && <span className="text-cream/70 text-lg lg:text-xl font-[300] ml-0.5">{suffix}</span>}
    </span>
  );
}

export default function Hero({
  tagline = "Авторское ремесло",
  titleLines = DEFAULT_TITLE_LINES,
  description = "Проектируем и изготавливаем минималистичную мебель из ценных пород дерева по индивидуальным размерам. Каждое изделие — единственное в своем роде.",
  primaryBtnText = "Обсудить проект",
  secondaryBtnText = "Перейти в каталог",
  bgImageUrl = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1800&h=1200&fit=crop&auto=format",
  stats = DEFAULT_STATS,
}: HeroProps) {
  const scrollToContacts = () => {
    const contactsElement = document.getElementById("contacts");
    if (contactsElement) {
      contactsElement.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#contacts";
    }
  };

  return (
    <section className="relative min-h-[100dvh] flex items-end pt-28 pb-10 lg:pb-16 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src={bgImageUrl}
          alt="Интерьер с авторской мебелью"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-walnut/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-walnut via-walnut/70 to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 w-full">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-cream/80 text-[11px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase mb-4 sm:mb-6 font-medium"
          >
            {tagline}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="font-display text-[clamp(2.5rem,10vw,6.5rem)] leading-[0.98] lg:leading-[0.95] font-[300] text-cream mb-6 sm:mb-8 flex flex-col items-start gap-0.5 sm:gap-1"
          >
            {titleLines.map((line, index) => (
              <span
                key={line}
                className={index === 1 ? "italic font-[300] text-cream/90" : ""}
              >
                {line}
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="text-cream/90 text-sm sm:text-base lg:text-lg font-[300] max-w-md mb-8 sm:mb-10 leading-relaxed"
          >
            {description}
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto"
          >

            <Button
              variant="secondary"
              size="lg"
              fullWidth
              className="sm:w-auto cursor-pointer"
              onClick={scrollToContacts}
            >
              {primaryBtnText}
            </Button>

            <Link href="/catalog" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                fullWidth
                className="sm:w-full cursor-pointer"
              >
                {secondaryBtnText}
              </Button>
            </Link>
          </motion.div>

          {stats.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
              className="w-full lg:w-auto"
            >
              <div className="bg-walnut/40 backdrop-blur-md border border-cream/15 p-3.5 sm:p-4 lg:p-5 flex items-center justify-between lg:justify-start gap-4 sm:gap-6 shadow-xl">
                {stats.map((stat, idx) => (
                  <div
                    key={stat.label}
                    className="flex items-center gap-4 sm:gap-6 flex-1 lg:flex-none justify-center lg:justify-start"
                  >
                    <div className="text-center lg:text-left">
                      <p className="font-display text-xl sm:text-2xl lg:text-3xl font-[300] text-cream leading-none">
                        <AnimatedNumber value={stat.value} />
                      </p>
                      <p className="text-[9px] sm:text-[10px] tracking-[0.1em] uppercase text-cream/70 mt-1 font-light">
                        {stat.label}
                      </p>
                    </div>
                    {idx < stats.length - 1 && (
                      <div className="w-[1px] h-6 sm:h-8 bg-cream/15 hidden sm:block lg:block" />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}