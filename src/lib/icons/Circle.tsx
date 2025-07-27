import { Icon } from "@/components/ui/icon";

export const Circle = (props: React.ComponentProps<typeof Icon>) => (
  <Icon {...props} viewBox="0 0 24 24" fill="none">
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="1.5"
      stroke-linejoin="round"
    ></circle>
  </Icon>
);
