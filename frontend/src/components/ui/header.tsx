"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./button";
import NavLinks from "../navLinks";
import { SITE_CONFIG } from "@/cfg/site";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { name, contacts } = SITE_CONFIG;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-cream/95 backdrop-blur-sm shadow-[0_1px_0_0_var(--color-muted)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <a
            href="#"
            className="font-display text-2xl font-[400] tracking-[0.12em] uppercase text-walnut hover:text-terra transition-colors"
          >
            {name}
          </a>

          <div className="hidden md:flex">
            <NavLinks />
          </div>

          <div className="hidden md:flex items-center">
            <Button variant="primary" size="sm" href="#contacts">
              Связаться
            </Button>
          </div>

          <button
            className="md:hidden p-1 text-walnut focus:outline-none flex flex-col justify-center items-stretch gap-1.5 w-8 h-8 group"
            onClick={() => setMenuOpen(true)}
            aria-label="Открыть меню"
          >
            <span className="w-full h-[2px] bg-walnut transition-colors group-hover:bg-terra rounded-full" />
            <span className="w-full h-[2px] bg-walnut transition-colors group-hover:bg-terra rounded-full" />
            <span className="w-full h-[2px] bg-walnut transition-colors group-hover:bg-terra rounded-full" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-stone-950/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full h-[100dvh] bg-cream z-10 flex flex-col justify-between px-6 py-8 overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-muted/50 pb-6">
                <span className="font-display text-xl font-[400] tracking-[0.12em] uppercase text-walnut">
                  {name}
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 text-walnut font-mono text-base tracking-widest uppercase hover:opacity-60 transition-opacity"
                  aria-label="Закрыть меню"
                >
                  ✕
                </button>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="py-10"
              >
                <NavLinks
                  className="flex flex-col gap-6"
                  itemClassName="font-serif text-3xl font-light text-walnut hover:text-terra transition-colors tracking-wide"
                  onItemClick={() => setMenuOpen(false)}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="pt-6 border-t border-muted/50 flex flex-col gap-5"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono tracking-widest text-walnut/60 uppercase">
                    Прямой контакт
                  </span>
                  <a
                    href={`tel:${contacts.phoneRaw}`}
                    className="font-serif text-lg text-walnut font-light"
                  >
                    {contacts.phoneFormatted}
                  </a>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  href="#contacts"
                  onClick={() => setMenuOpen(false)}
                >
                  Связаться
                </Button>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}