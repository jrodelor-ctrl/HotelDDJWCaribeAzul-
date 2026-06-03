import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "success" | "warning" | "danger" | "info" | "default";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

export function Badge({
  children,
  variant = "default",
  className,
  ...props
}: BadgeProps) {
  const variants: Record<BadgeVariant, string> = {
    success:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
    warning:
      "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
    danger:
      "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
    info:
      "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    default:
      "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}