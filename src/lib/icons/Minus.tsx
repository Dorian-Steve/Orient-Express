import { Icon } from "@/components/ui/icon";

export const Minus = (props: React.ComponentProps<typeof Icon>) => (
  <Icon {...props} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 12L4 12" stroke="currentColor" strokeWidth="1.5"></path>
  </Icon>
);
