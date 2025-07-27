"use client";

import { useTheme } from "next-themes";
import * as React from "react";
import { toast as sonnerToast, Toaster as SonnerToaster, type ToasterProps } from "sonner";

import { Info } from "@/lib/icons/Info";
import { ShieldCross } from "@/lib/icons/ShieldCross";
import { ShieldTick } from "@/lib/icons/ShieldTick";
import { ShieldWarning } from "@/lib/icons/ShieldWarning";
import { cn } from "@/lib/utils";

interface ToastOptions {
  duration?: number;
  id?: string;
}

interface ToastIconProps {
  icon: React.ReactElement<{ className?: string }>;
  iconColor: string;
  iconBg: string;
}

function ToastIcon({ icon, iconColor, iconBg }: ToastIconProps) {
  return (
    <div className={cn("rounded-[0.8rem] p-3", iconBg)}>
      {React.cloneElement(icon, {
        className: cn("flex-center size-4", iconColor, icon.props.className),
      })}
    </div>
  );
}

// Main Toaster component
export function Toaster() {
  const { resolvedTheme } = useTheme();

  return (
    <SonnerToaster
      theme={resolvedTheme as ToasterProps["theme"]}
      closeButton
      expand
      position="bottom-right"
    />
  );
}

// Define toast icons and colors
const toastConfig = {
  success: {
    icon: <ShieldTick />,
    iconColor: "text-success-main",
    iconBg: "bg-success-lighter/50",
  },
  error: {
    icon: <ShieldCross />,
    iconColor: "text-destructive",
    iconBg: "bg-destructive/5",
  },
  warning: {
    icon: <ShieldWarning />,
    iconColor: "text-warning-main",
    iconBg: "bg-warning-lighter/50",
  },
  info: {
    icon: <Info />,
    iconColor: "text-info-main",
    iconBg: "bg-info-lighter/50",
  },
};

// Export toast object with methods
export const toast = {
  success: (message: string, options?: ToastOptions) => {
    return sonnerToast(message, {
      duration: options?.duration ?? 5000,
      id: options?.id,
      icon: (
        <ToastIcon
          icon={toastConfig.success.icon}
          iconColor={toastConfig.success.iconColor}
          iconBg={toastConfig.success.iconBg}
        />
      ),
    });
  },

  error: (message: string, options?: ToastOptions) => {
    return sonnerToast(message, {
      duration: options?.duration ?? 5000,
      id: options?.id,
      icon: (
        <ToastIcon
          icon={toastConfig.error.icon}
          iconColor={toastConfig.error.iconColor}
          iconBg={toastConfig.error.iconBg}
        />
      ),
    });
  },

  warning: (message: string, options?: ToastOptions) => {
    return sonnerToast(message, {
      duration: options?.duration ?? 5000,
      id: options?.id,
      icon: (
        <ToastIcon
          icon={toastConfig.warning.icon}
          iconColor={toastConfig.warning.iconColor}
          iconBg={toastConfig.warning.iconBg}
        />
      ),
    });
  },

  info: (message: string, options?: ToastOptions) => {
    return sonnerToast(message, {
      duration: options?.duration ?? 5000,
      id: options?.id,
      icon: (
        <ToastIcon
          icon={toastConfig.info.icon}
          iconColor={toastConfig.info.iconColor}
          iconBg={toastConfig.info.iconBg}
        />
      ),
    });
  },

  dismiss: sonnerToast.dismiss,
  promise: sonnerToast.promise,
};
