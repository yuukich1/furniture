"use client";

import { motion } from "framer-motion";
import { SITE_CONFIG } from "../../cfg/site";

export default function ContactsSection() {
  const { contacts } = SITE_CONFIG;

  return (
    <section id="contacts" className="bg-white text-[#1C1410] py-16 sm:py-24 lg:py-32 border-t border-[#EDE6DB]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mx-auto mb-12 sm:mb-8">
          <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-[300] leading-tight text-[#1C1410]">
            Контакты
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 border-t border-b border-[#D6CEC4] py-10 lg:py-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-between md:border-r border-[#D6CEC4] md:pr-8 lg:pr-12 border-b md:border-b-0 pb-10 md:pb-0"
          >
            <div className="mb-8">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#8A7F74] block mb-3 font-mono">
                Телефон
              </span>
              <a
                href={`tel:${contacts.phoneRaw}`}
                className="font-display text-2xl lg:text-3xl font-[300] text-[#1C1410] hover:text-[#B85C38] transition-colors block mb-2"
              >
                {contacts.phoneFormatted}
              </a>
              <p className="text-xs text-[#8A7F74] font-[300] leading-relaxed">
                Звонок архитектору. Без автоответчиков.
              </p>
            </div>
            
            <a
              href={`tel:${contacts.phoneRaw}`}
              className="mt-auto inline-flex items-center justify-between w-full h-12 bg-[#1C1410] text-[#F7F3EE] px-6 text-xs tracking-widest uppercase hover:bg-[#B85C38] transition-colors duration-300"
            >
              <span>Позвонить</span>
              <span>→</span>
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col justify-between md:border-r border-[#D6CEC4] md:px-8 lg:px-12 border-b md:border-b-0 pb-10 md:pb-0"
          >
            <div className="mb-8">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#8A7F74] block mb-3 font-mono">
                Email
              </span>
              <a
                href={`mailto:${contacts.email}`}
                className="font-display text-2xl lg:text-3xl font-[300] text-[#1C1410] hover:text-[#B85C38] transition-colors block mb-2"
              >
                {contacts.email}
              </a>
              <p className="text-xs text-[#8A7F74] font-[300] leading-relaxed">
                Для коммерческих предложений и КП.
              </p>
            </div>

            <a
              href={`mailto:${contacts.email}`}
              className="mt-auto inline-flex items-center justify-between w-full h-12 bg-[#F7F3EE] border border-[#D6CEC4] text-[#1C1410] px-6 text-xs tracking-widest uppercase hover:bg-[#1C1410] hover:text-[#F7F3EE] hover:border-[#1C1410] transition-colors duration-300"
            >
              <span>Написать</span>
              <span>✉</span>
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-between md:pl-8 lg:pl-12"
          >
            <div className="mb-8">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#8A7F74] block mb-3 font-mono">
                Адрес
              </span>
              <p className="font-display text-xl lg:text-2xl font-[300] text-[#1C1410] leading-snug mb-2">
                {contacts.address}
              </p>
              <p className="text-xs text-[#8A7F74] font-[300]">
                Шоурум и производство
              </p>
            </div>

            <div className="mt-auto h-12 border-t border-[#EDE6DB] flex items-center justify-between text-xs text-[#8A7F74]">
              <span className="font-mono text-[10px]">Режим работы:</span>
              <span className="font-mono text-[10px]">{contacts.workHours}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}