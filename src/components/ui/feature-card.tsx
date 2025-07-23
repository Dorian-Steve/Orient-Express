// components/feature-card.tsx
import * as react from "react";

import { cn } from "@/lib/utils";
import type { Icon } from "@/types/icon.types";

import { Card, CardContent, CardHeader, CardTitle } from "./card";

export const FeatureCard = ({
  icon,
  title, // Now accepting the translated text directly
  description, // Now accepting the translated text directly
  colorClass,
  isRow = true,
}: {
  icon: Icon;
  title: string;
  description: string;
  colorClass: string;
  isRow?: boolean;
}) => {
  // No need for getTranslations here
  return (
    <Card className="h-full rounded-2xl">
      <CardHeader className={isRow ? "flex" : "grid"}>
        <div className={`${colorClass} flex-center size-10 rounded-xl p-2`}>
          {react.isValidElement(icon)
            ? react.cloneElement(icon, {
                className: cn(
                  "size-6",
                  `text-${colorClass}-main`,
                  icon.props.className,
                ),
              })
            : null}
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">{description}</p>
      </CardContent>
    </Card>
  );
};
