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
      "inline-flex items-center justify-center font-bold rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

    const variantStyles = {
      // Primary button: Tech Cyan-Blue Gradient with white text and glowing shadow (Royana Tech style)
      primary:
        "bg-gradient-to-r from-[#00d2ff] via-[#38bdf8] to-[#3a7bd5] text-white font-extrabold shadow-[0_4px_15px_rgba(0,210,255,0.35)] hover:shadow-[0_6px_22px_rgba(0,210,255,0.55)] hover:-translate-y-0.5 focus-visible:outline-[#00d2ff]",
      secondary:
        "bg-[#121e34] border border-sky-400/20 text-white hover:bg-[#1a2c4c] hover:border-sky-400/50 shadow-md focus-visible:outline-[#38bdf8]",
      outline:
        "border border-sky-400/30 bg-white/5 text-slate-100 hover:bg-sky-500/15 hover:border-[#00d2ff] hover:text-[#00d2ff] hover:-translate-y-0.5 backdrop-blur-sm focus-visible:outline-[#00d2ff]",
      ghost:
        "text-slate-200 hover:text-[#00d2ff] hover:bg-white/5 focus-visible:outline-sky-400",
      whatsapp:
        "bg-[#25D366] hover:bg-[#20BA57] text-[#070d18] font-extrabold shadow-[0_4px_15px_rgba(37,211,102,0.35)] hover:shadow-[0_6px_22px_rgba(37,211,102,0.55)] hover:-translate-y-0.5 focus-visible:outline-[#25D366]",
    };

    const sizeStyles = {
      sm: "text-xs px-3.5 py-1.5 gap-1.5",
      md: "text-sm sm:text-base px-6 py-2.5 gap-2",
      lg: "text-base sm:text-lg px-8 py-3.5 gap-2.5",
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
