import { Icon } from "@/components/ui/icon";

export const Plus = (props: React.ComponentProps<typeof Icon>) => (
  <Icon {...props} viewBox="0 0 24 24" fill="none">
    <path
      d="M12.001 5.00003V19.002"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19.002 12.002L4.99998 12.002"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);
