import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, id, ...props }, ref) => {
    const generatedId = React.useId();
    const textareaId = id ?? generatedId;

    return (
      <div className="relative w-full">
        <textarea
          id={textareaId}
          ref={ref}
          data-slot="textarea"
          placeholder=" "
          className={cn(
            "border-input aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-lg border bg-transparent px-3 py-3 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-transparent focus-visible:border-2 focus-visible:border-gray-700 focus-visible:ring-transparent disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-transparent md:text-base dark:aria-invalid:ring-transparent",
            label && "pt-6",
            className,
          )}
          {...props}
        />
        {label && (
          <label
            htmlFor={textareaId}
            className={cn(
              "text-secondary-foreground pointer-events-none absolute top-2 left-3 origin-[0] px-0.5 text-sm transition-all duration-200",
              "peer-focus:text-secondary-foreground peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs",
              "peer-not-placeholder-shown:text-secondary-foreground peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:-translate-y-0 peer-not-placeholder-shown:text-xs",
              "peer-placeholder-shown:text-secondary-foreground peer-placeholder-shown:top-7 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-xs",
            )}
          >
            {label}
          </label>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export { Textarea };
