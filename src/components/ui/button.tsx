import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "min-w-16 inline-flex items-center justify-center relative select-none leading-[1.71429] gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none cursor-pointer [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-none focus-visible:ring-0 focus:ring-0 focus-visible:ring-none transition-all",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        primary: "bg-brand-main text-primary-foreground hover:bg-brand-main/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-transparent backdrop-blur-sm hover:opacity-90 hover:border-2 hover:border-primary dark:bg-input/30 b dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-foreground hover:bg-secondary/90",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        gradient:
          "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
      },
      size: {
        default: "py-1.5 px-3 has-[>svg]:px-3 leading-6",
        sm: "h-[30px] gap-1.5 py-1 px-2 has-[>svg]:px-2",
        lg: "h-12 py-2 px-4 has-[>svg]:px-4",
        icon: "min-w-0 p-2 has-[>svg]:size-8 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonProps = {
  className?: string;
  children: React.ReactNode;
  asChild?: boolean;
} & VariantProps<typeof buttonVariants> &
  Omit<React.ComponentPropsWithoutRef<"button">, "size"> &
  Omit<React.ComponentPropsWithoutRef<"a">, "size">;

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : props.href ? "a" : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
