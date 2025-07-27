// src/components/shared/loader.tsx
import { cn } from "@/lib/utils"; // Assuming you have a utility for class concatenation

interface LoaderProps {
  /**
   * Size of the loader. Can be 'sm', 'md', 'lg', or a custom Tailwind size like 'h-8 w-8'.
   * Defaults to 'md'.
   */
  size?: "sm" | "md" | "lg" | string;
  /**
   * Color of the loader. Can be a Tailwind color class like 'border-t-blue-500' or 'border-t-primary'.
   * Defaults to 'border-t-gray-900' (dark mode aware).
   */
  color?: string;
  /**
   * Additional Tailwind CSS classes to apply to the loader container.
   */
  className?: string;
}

export function Loader({
  size = "md", // Default size
  color = "border-t-primary", // Default color, using 'primary' from your theme
  className,
}: LoaderProps) {
  // Map size prop to Tailwind classes
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  // Determine the actual size class to apply
  const currentSizeClass =
    sizeClasses[size as keyof typeof sizeClasses] || size;

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div
        className={cn(
          "animate-spin rounded-full border-2 border-gray-300 dark:border-gray-600", // Base border color
          color, // Dynamic border-top color
          currentSizeClass, // Dynamic size
        )}
      />
    </div>
  );
}
