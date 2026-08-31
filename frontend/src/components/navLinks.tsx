import { NAV_LINKS, NavLink } from "@/cfg/nav";



interface NavLinksProps {
  links?: NavLink[];
  className?: string;       
  itemClassName?: string;  
  onItemClick?: () => void; 
}

export default function NavLinks({
  links = NAV_LINKS,
  className = "flex items-center gap-8",
  itemClassName = "text-sm font-[400] tracking-wide text-warm-gray hover:text-walnut transition-colors duration-200",
  onItemClick,
}: NavLinksProps) {
  return (
    <nav className={className}>
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          onClick={onItemClick}
          className={itemClassName}
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}