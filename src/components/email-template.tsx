import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
}

export function EmailTemplate({ firstName }: EmailTemplateProps) {
  return (
    <div>
      <h1>Welcome To Orient-Express, {firstName}!</h1>
    </div>
  );
}
