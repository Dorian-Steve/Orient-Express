import React from "react";

import { Icon } from "@/components/ui/icon";

export const ArrowDown = (props: React.ComponentProps<typeof Icon>) => (
  <Icon {...props} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <path
      d="M19.92 8.9502L13.4 15.4702C12.63 16.2402 11.37 16.2402 10.6 15.4702L4.07996 8.9502"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);
