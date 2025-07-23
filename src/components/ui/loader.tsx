"use client"; // Mark as a client component if it might involve client-side state or effects, though this simple spinner doesn't strictly require it.

import React from "react";

interface LoaderProps {
  /**
   * Optional size of the loader in Tailwind CSS units (e.g., 'h-8 w-8').
   * Defaults to 'h-8 w-8'.
   */
  size?: string;
  /**
   * Optional color of the loader in Tailwind CSS color classes (e.g., 'text-blue-500').
   * Defaults to 'text-primary'.
   */
  color?: string;
  /**
   * Optional additional CSS classes for the loader container.
   */
  className?: string;
}

/**
 * A simple spinning loader component.
 */
export function Loader({
  size = "h-8 w-8",
  color = "text-primary",
  className = "",
}: LoaderProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        className={`animate-spin ${size} ${color}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
}
