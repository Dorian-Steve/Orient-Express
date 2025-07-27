// src/components/sign-in.tsx
"use client";

import { signIn } from "next-auth/react";

export default function SignInButton() {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
    >
      Sign in with Google
    </button>
  );
}
