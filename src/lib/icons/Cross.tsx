import { Icon } from "@/components/ui/icon";

export const Cross = (props: React.ComponentProps<typeof Icon>) => (
  <Icon {...props} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6L12 12M12 12L6 18M12 12L18 18M12 12L6 6" />
  </Icon>
);

Cross.displayName = "Cross";
