import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { Eye } from "@/lib/icons/Eye";
import { EyeOff } from "@/lib/icons/EyeOff";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  [
    "peer file:text-foreground placeholder:text-transparent selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex w-full min-w-0 p-3 rounded-lg border bg-transparent text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:border-2 focus-visible:border-gray-700 focus-visible:ring-transparent aria-invalid:ring-transparent dark:aria-invalid:ring-transparent aria-invalid:border-destructive",
    "focus-visible:border-2 focus-visible:border-gray-700 focus-visible:ring-transparent",
    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  ],
  {
    variants: {
      size: {
        sm: "h-8 text-sm",
        default: "h-11 text-base",
        lg: "h-14 text-lg",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  label?: string;
  size?: "sm" | "default" | "lg";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size, label, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const effectiveSize = label ? "lg" : (size ?? "default");

    // Password toggle state
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    return (
      <div className="relative w-full">
        <input
          id={inputId}
          ref={ref}
          type={inputType}
          data-slot="input"
          placeholder=" "
          className={cn(inputVariants({ size: effectiveSize }), label && "pt-6", className)}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            data-size={size}
            className="hover:bg-accent hover:text-accent-foreground absolute top-1/2 right-3 z-10 flex -translate-y-1/2 items-center justify-center rounded-full p-2 transition-colors duration-200 data-[size=lg]:size-10"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <Eye data-size={size} className="data-[size=lg]:mt-0.5" />
            ) : (
              <EyeOff data-size={size} className="data-[size=lg]:mt-0.5" />
            )}
          </button>
        )}
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "text-secondary-foreground pointer-events-none absolute top-2 left-3 origin-[0] px-0.5 transition-all duration-200",
              "peer-focus:text-secondary-foreground peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs",
              "peer-not-placeholder-shown:text-secondary-foreground peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:-translate-y-0 peer-not-placeholder-shown:text-xs",
              "peer-placeholder-shown:text-secondary-foreground peer-placeholder-shown:top-7 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm",
            )}
          >
            {label}
          </label>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input, inputVariants };
