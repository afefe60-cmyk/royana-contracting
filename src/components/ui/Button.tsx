import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "whatsapp";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      href,
      external,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-bold rounded-lg transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

    const variantStyles = {
      // Primary button: Accent bronze background with deep navy text (strictly NO white text)
      primary:
        "bg-[#C68B59] hover:bg-[#B57B4B] text-[#0B192C] shadow-sm focus-visible:outline-[#C68B59]",
      secondary:
        "bg-[#0B192C] hover:bg-[#162C46] text-[#FFFFFF] shadow-sm focus-visible:outline-[#0B192C]",
      outline:
        "border-2 border-[#C68B59] text-[#0B192C] hover:bg-[#C68B59] hover:text-[#0B192C] focus-visible:outline-[#C68B59]",
      ghost:
        "text-[#1E293B] hover:bg-slate-100 focus-visible:outline-slate-400",
      whatsapp:
        "bg-[#25D366] hover:bg-[#20BA57] text-[#0B192C] shadow-md focus-visible:outline-[#25D366]",
    };

    const sizeStyles = {
      sm: "text-xs px-3 py-1.5 gap-1.5",
      md: "text-sm sm:text-base px-5 py-2.5 gap-2",
      lg: "text-base sm:text-lg px-7 py-3.5 gap-2.5",
    };

    const combinedClassName = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    if (href) {
      if (external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={combinedClassName}
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={combinedClassName}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={combinedClassName} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
