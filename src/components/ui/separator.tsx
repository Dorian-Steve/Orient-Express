"use client";

import * as SeparatorPrimitive from "@radix-ui/react-separator";
import * as React from "react";

import { cn } from "@/lib/utils";

interface SeparatorProps extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
  className?: string;
  color?: string;
  thickness?: number | string;
  isDashed?: boolean;
  dashLength?: number;
  gapLength?: number;
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
}

function Separator({
  className,
  color = "var(--border)", // fallback to theme border color
  thickness = 0.5,
  isDashed = false,
  dashLength = 4,
  gapLength = 2,
  orientation = "horizontal",
  decorative = true,
  ...props
}: SeparatorProps) {
  const isHorizontal = orientation === "horizontal";

  const baseStyles = cn(
    "shrink-0 my-2",
    isHorizontal ? "w-full" : "h-full",
    isHorizontal ? "" : "",
    className,
  );

  const style: React.CSSProperties = {
    backgroundColor: isDashed ? "transparent" : color,
    [isHorizontal ? "height" : "width"]:
      typeof thickness === "number" ? `${thickness}px` : thickness,
    [isHorizontal ? "width" : "height"]: isHorizontal ? "100%" : "100%",
    ...(isDashed && {
      backgroundImage: `repeating-linear-gradient(
        ${isHorizontal ? "to right" : "to bottom"},
        ${color},
        ${color} ${dashLength}px,
        transparent ${dashLength}px,
        transparent ${dashLength + gapLength}px
      )`,
    }),
  };

  return (
    <SeparatorPrimitive.Root
      decorative={decorative}
      orientation={orientation}
      data-slot="separator-root"
      className={baseStyles}
      style={style}
      {...props}
    />
  );
}

export { Separator };
