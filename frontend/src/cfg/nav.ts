export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Коллекции", href: "#collections" },
  { label: "Материалы", href: "#materials" },
  { label: "Каталог", href: "/catalog" },
  { label: "Контакты", href: "#contacts" },
];