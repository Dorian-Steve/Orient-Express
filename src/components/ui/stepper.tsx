// components/stepper.tsx
"use client";

import * as react from "react";

import { cn } from "@/lib/utils";
import type { Icon } from "@/types/icon.types";

export type StepStatus = "complete" | "current" | "upcoming";

interface Step {
  id: number;
  title: string;
  icon: Icon;
  status: StepStatus;
}

interface StepperProps {
  steps: Step[];
  className?: string;
}

export function Stepper({ steps, className }: StepperProps) {
  return (
    <nav aria-label="Progress" className={cn("", className)}>
      <div className="shadow-card grid grid-cols-1 items-center gap-4 rounded-3xl border-dashed bg-white p-4 md:grid-cols-3 md:divide-x md:divide-dashed md:rounded-full">
        {steps.map((step, stepIdx) => (
          <div key={step.id} className="flex items-center justify-start gap-4">
            <div
              className={cn(
                "flex min-h-10 min-w-10 items-center justify-center rounded-full border",
                step.status === "complete"
                  ? "bg-brand-main/70 border-brand-main/65 !text-primary-foreground"
                  : step.status === "current"
                    ? "bg-brand-main/5 border-brand-main/70"
                    : "border-muted-foreground",
              )}
            >
              {react.isValidElement(step.icon) &&
                react.cloneElement(step.icon, {
                  className: cn(
                    step.status === "complete"
                      ? "text-primary-foreground"
                      : step.status === "current"
                        ? "text-brand-main"
                        : "border-muted-foreground",
                  ),
                })}
            </div>
            <div>
              <p className="text-muted-foreground text-xs">
                Step {stepIdx + 1}/{steps.length}
              </p>
              <p className="line-clamp-1 text-sm font-medium">{step.title}</p>
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
}
