import * as React from "react";
import { cn } from "../../lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "success" | "warning" | "destructive";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "border-transparent bg-primary text-primary-foreground",
    outline: "text-primary border-primary",
    success: "border-transparent bg-green-900 text-green-300",
    warning: "border-transparent bg-yellow-900 text-yellow-300",
    destructive: "border-transparent bg-red-900 text-red-300",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold uppercase transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
