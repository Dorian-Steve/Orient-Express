import React from "react";

import { Icon } from "@/components/ui/icon";

export const Location = (props: React.ComponentProps<typeof Icon>) => (
  <Icon {...props} fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path d="M15 9.5C15 11.1569 13.6569 12.5 12 12.5C10.3431 12.5 9 11.1569 9 9.5C9 7.84315 10.3431 6.5 12 6.5C13.6569 6.5 15 7.84315 15 9.5Z" />
    <path d="M12 2C16.0588 2 19.5 5.42803 19.5 9.5869C19.5 13.812 16.0028 16.777 12.7725 18.7932C12.5371 18.9287 12.2709 19 12 19C11.7291 19 11.4629 18.9287 11.2275 18.7932C8.00325 16.7573 4.5 13.8266 4.5 9.5869C4.5 5.42803 7.9412 2 12 2Z" />
    <path
      d="M12 22L13.5 19.5H10.5L12 22Z"
      fill="currentColor"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);

Location.displayName = "Location";
