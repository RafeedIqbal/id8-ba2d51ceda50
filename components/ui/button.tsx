import * as React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "solid", size = "md", ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-mono uppercase tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50";
    
    const variants = {
      solid: "bg-primary text-primary-foreground hover:bg-primary/80 hover:shadow-[0_0_15px_rgba(0,255,0,0.6)]",
      outline: "border border-primary bg-transparent text-primary hover:bg-primary/10 hover:shadow-[0_0_10px_rgba(0,255,0,0.3)]",
      ghost: "bg-transparent text-primary hover:bg-primary/10 hover:text-primary",
    };
    
    const sizes = {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-4 py-2 text-sm",
      lg: "h-12 px-8 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {props.children}
      </button>
    );
  }
);
Button.displayName = "Button";
