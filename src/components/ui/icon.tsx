import * as React from "react";
import { type SVGProps } from "react";

import { cn } from "@/lib/utils";

interface IconProps extends SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
}

const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = 18, children, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={cn(className)}
        {...props}
      >
        {children}
      </svg>
    );
  },
);
Icon.displayName = "Icon";

export { Icon, type IconProps };
