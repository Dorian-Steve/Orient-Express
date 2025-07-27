// src/app/auth/verify-request/page.tsx
import React from "react";

export default function VerifyRequestPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-gray-800">
          Check your email
        </h1>
        <p className="mb-6 text-gray-600">
          A sign-in link has been sent to your email address. Please check your
          inbox (and spam folder) to complete the login process.
        </p>
        <p className="text-sm text-gray-500">You can close this window now.</p>
      </div>
    </div>
  );
}
