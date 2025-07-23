import { Icon } from "@/components/ui/icon";

export const Check = (props: React.ComponentProps<typeof Icon>) => (
  <Icon {...props} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <path d="m5 12 5 5L20 7" />
  </Icon>
);

Check.displayName = "Check";
