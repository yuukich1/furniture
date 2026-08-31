import { ReactNode, ButtonHTMLAttributes, ElementType } from "react";
import Link from "next/link";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "telegram"
  | "whatsapp"
  | "phone";

type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  as?: ElementType;
  href?: string;
  target?: string;
  rel?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-walnut text-cream hover:bg-terra transition-colors duration-300",
  secondary:
    "bg-cream text-walnut hover:bg-terra hover:text-cream transition-colors duration-300",
  outline:
    "border border-cream/40 text-cream hover:border-cream transition-colors duration-300",
  ghost:
    "text-warm-gray hover:text-walnut transition-colors duration-200 bg-transparent",
  telegram:
    "bg-[#229ED9] text-white hover:bg-[#1d8ec3] transition-colors duration-300 shadow-sm",
  whatsapp:
    "bg-[#25D366] text-white hover:bg-[#20bd5a] transition-colors duration-300 shadow-sm",
  phone:
    "bg-white text-walnut hover:bg-stone-100 transition-colors duration-300 font-medium",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "text-xs px-4 py-2 tracking-wide",
  md: "text-xs font-mono uppercase px-5 py-3.5 tracking-wider",
  lg: "text-xs font-mono uppercase px-8 py-4 tracking-wider",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  as,
  href,
  ...props
}: ButtonProps) {
  const Component: ElementType = as || (href ? Link : "button");

  const combinedClassName = `inline-flex items-center justify-center font-body cursor-pointer select-none ${
    variantStyles[variant]
  } ${sizeStyles[size]} ${fullWidth ? "w-full" : ""} ${className}`;

  return (
    <Component
      href={href}
      className={combinedClassName}
      {...props}
    >
      {children}
    </Component>
  );
}