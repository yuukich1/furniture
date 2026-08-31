"use client";

import { motion } from "framer-motion";
import Button from "./button";
import DynamicYear from "../DynamicYear";
import NavLinks from "../navLinks";
import { SITE_CONFIG } from "@/cfg/site";

export default function Footer() {
  const { name, description, contacts, socials } = SITE_CONFIG;

  return (
    <footer className="bg-walnut text-cream border-t border-cream/15 pt-20 pb-12 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-cream/15"
        >
          <div className="lg:col-span-4 space-y-4">
            <span className="font-display text-2xl sm:text-3xl tracking-tight text-cream block uppercase font-[400]">
              {name}
            </span>
            <p className="text-xs text-cream/70 font-[300] leading-relaxed max-w-xs">
              {description}
            </p>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-cream/40 block mb-2">
              Навигация
            </span>
            <NavLinks
              className="flex flex-col space-y-2.5"
              itemClassName="text-xs font-mono uppercase tracking-wider text-cream/80 hover:text-cream transition-colors inline-block"
            />
          </div>

          <div className="lg:col-span-2 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-cream/40 block mb-2">
              Контакты
            </span>
            <div className="space-y-1.5 text-xs font-mono text-cream/80">
              <a href={`tel:${contacts.phoneRaw}`} className="block hover:text-cream transition-colors">
                {contacts.phoneFormatted}
              </a>
              <a href={`mailto:${contacts.email}`} className="block hover:text-cream transition-colors">
                {contacts.email}
              </a>
              <p className="text-cream/40 pt-1">{contacts.workHours}</p>
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col justify-start gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-cream/40 block mb-1">
              Быстрая связь
            </span>
            <div className="flex gap-2">
              <Button
                href={socials.telegram}
                target="_blank"
                rel="noopener noreferrer"
                variant="telegram"
                size="sm"
                fullWidth
              >
                TG ↗
              </Button>
              <Button
                href={socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                variant="whatsapp"
                size="sm"
                fullWidth
              >
                WA ↗
              </Button>
            </div>
            <Button
              href={`tel:${contacts.phoneRaw}`}
              variant="secondary"
              size="sm"
              fullWidth
            >
              Заказать звонок
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-cream/40"
        >
          <p>© <DynamicYear /> {name}. Все права защищены.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-cream transition-colors">
              Политика конфиденциальности
            </a>
            <a href="#" className="hover:text-cream transition-colors">
              Пользовательское соглашение
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}