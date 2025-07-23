import { Icon } from "@/components/ui/icon";

export const Speaker = (props: React.ComponentProps<typeof Icon>) => (
  <Icon {...props} viewBox="0 0 24 24" fill="none">
    <path d="M11 6L1 6" strokeWidth="1.5" strokeLinecap="round"></path>
    <path d="M6 1L6 11" strokeWidth="1.5" strokeLinecap="round"></path>
  </Icon>
);
