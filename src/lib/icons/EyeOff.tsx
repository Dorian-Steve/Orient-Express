import { Icon } from "@/components/ui/icon";

export const EyeOff = (props: React.ComponentProps<typeof Icon>) => (
  <Icon
    {...props}
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 8C22 8 18 14 12 14C6 14 2 8 2 8" />
    <path d="M15 13.5L16.5 16" />
    <path d="M20 11L22 13" />
    <path d="M4 11L2 13" />
    <path d="M9 13.5L7.5 16" />
  </Icon>
);

EyeOff.displayName = "EyeOff";
