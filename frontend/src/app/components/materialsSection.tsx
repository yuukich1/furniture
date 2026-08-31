"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface MaterialItem {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  description: string;
  features: string[];
  imageUrl: string;
}

const MATERIALS: MaterialItem[] = [
  {
    id: "guarantee",
    number: "01",
    name: "Пожизненная гарантия",
    subtitle: "ЭКСКЛЮЗИВНЫЕ ПРЕМИУМ-МАТЕРИАЛЫ",
    description:
      "Мы уверены в безупречном качестве каждого изделия. Используем только отборный массив ценных пород дерева и надежную фурнитуру, что позволяет нам давать пожизненную гарантию на всю мебель.",
    features: ["Премиум-материалы", "Надежная фурнитура", "Контроль качества"],
    imageUrl:
      "https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?w=1200&fit=crop&auto=format",
  },
  {
    id: "projects",
    number: "02",
    name: "Более 5000 проектов",
    subtitle: "ОПЫТ И МАСШТАБ",
    description:
      "За плечами нашей команды более 5000 успешно реализованных интерьерных решений. Мы знаем, как воплотить в жизнь самые сложные и нетривиальные задумки дизайнеров и клиентов.",
    features: ["Реализованные кейсы", "Экспертная команда", "Сложные проекты"],
    imageUrl:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&fit=crop&auto=format",
  },
  {
    id: "custom",
    number: "03",
    name: "Индивидуальное изготовление",
    subtitle: "ОТ 1 МЕСЯЦА ПО ВАШИМ МЕРКАМ",
    description:
      "Реализуем любые формы, цвета и нестандартные размеры. Изготавливаем эксклюзивную мебель строго по вашим меркам в сжатые сроки — от 1 месяца с момента утверждения проекта.",
    features: ["Любые размеры и формы", "Сроки от 1 месяца", "Точный замер"],
    imageUrl:
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=1200&fit=crop&auto=format",
  },
];

export default function MaterialsSection() {
  const [activeId, setActiveId] = useState<string>(MATERIALS[0].id);
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 2;
      let closestId = MATERIALS[0].id;
      let minDistance = Infinity;

      MATERIALS.forEach((m) => {
        const el = cardRefs.current[m.id];
        if (el) {
          const rect = el.getBoundingClientRect();
          const elementCenter = rect.top + rect.height / 2;
          const distance = Math.abs(viewportCenter - elementCenter);

          if (distance < minDistance) {
            minDistance = distance;
            closestId = m.id;
          }
        }
      });

      setActiveId(closestId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); 

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeMaterial = MATERIALS.find((m) => m.id === activeId) || MATERIALS[0];

  return (
    <section id="materials" className="bg-walnut text-cream py-16 sm:py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 lg:mb-24 border-b border-cream/15 pb-6 sm:pb-8">
          <div>
            <span className="text-xs font-mono text-cream/50 tracking-widest uppercase mb-3 block">
              Наши преимущества
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-[300] tracking-tight text-cream">
              Индивидуальный подход <em className="italic font-[300] text-cream/70">и гарантии</em>
            </h2>
          </div>
          <p className="text-cream/60 text-xs sm:text-sm font-[300] max-w-md leading-relaxed">
            Создаем мебель по дизайн-проектам любой сложности. Воплощаем в жизнь ваши идеи с бескомпромиссным качеством.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-start">
          <div className="lg:col-span-6 sticky top-4 sm:top-28 z-20 pt-2 lg:pt-0">
            <div className="w-full aspect-[16/10] sm:aspect-[16/11] lg:aspect-[4/3] overflow-hidden bg-cream/5 border border-cream/15 shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMaterial.id}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={activeMaterial.imageUrl}
                    alt={activeMaterial.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover object-center"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-walnut/80 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 font-mono text-[10px] sm:text-xs tracking-widest text-cream/80 bg-walnut/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-cream/15">
                    {activeMaterial.number} / 0{MATERIALS.length}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col gap-20 sm:gap-32 lg:gap-40 py-6 sm:py-12">
            {MATERIALS.map((material) => {
              const isActive = activeId === material.id;

              return (
                <div
                  key={material.id}
                  id={material.id}
                  ref={(el) => {
                    cardRefs.current[material.id] = el;
                  }}
                  className={`transition-all duration-500 transform ${
                    isActive
                      ? "opacity-100 scale-100 translate-y-0"
                      : "opacity-25 scale-95 translate-y-2"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <span className="font-mono text-xs sm:text-sm text-cream/40">
                      {material.number}
                    </span>
                    <div className="h-[1px] w-6 sm:w-8 bg-cream/20" />
                    <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-cream/60">
                      {material.subtitle}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-4xl font-[300] text-cream mb-4 sm:mb-6">
                    {material.name}
                  </h3>

                  <p className="text-cream/80 text-xs sm:text-base font-[300] leading-relaxed mb-6 sm:mb-8 max-w-lg">
                    {material.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {material.features.map((feature) => (
                      <span
                        key={feature}
                        className="text-[10px] sm:text-xs tracking-wider uppercase bg-cream/5 border border-cream/15 text-cream/80 px-3 py-1.5 sm:px-4 sm:py-2"
                      >
                        ✓ {feature}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}