// src/app/login/page.tsx
"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignInPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [credentialsError, setCredentialsError] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/"); // Redirect to home or dashboard
    }
  }, [status, router]);

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setCredentialsError(""); // Clear previous errors

    const result = await signIn("credentials", {
      redirect: false, // Prevent NextAuth.js from redirecting
      email,
      password,
    });

    if (result?.error) {
      setCredentialsError(result.error);
    } else if (result?.ok) {
      router.push("/"); // Redirect on successful login
    }
  };

  const handleMagicLinkSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setCredentialsError(""); // Clear previous errors

    if (!email) {
      setCredentialsError("Please enter your email address.");
      return;
    }

    const result = await signIn("resend", {
      email,
      redirect: false, // Prevent NextAuth.js from redirecting
      callbackUrl: "/", // URL to redirect to after successful verification
    });

    if (result?.error) {
      setCredentialsError(result.error);
    } else if (result?.ok) {
      // Redirect to verifyRequest page or show a success message
      router.push("/auth/verify-request");
    }
  };

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Sign In
        </h1>

        {error && (
          <p className="mb-4 text-center text-red-600">
            {error === "CredentialsSignin"
              ? "Invalid email or password."
              : "An error occurred. Please try again."}
          </p>
        )}
        {credentialsError && (
          <p className="mb-4 text-center text-red-600">{credentialsError}</p>
        )}

        {/* OAuth Sign In Buttons */}
        <div className="mb-6 space-y-4">
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
          >
            <img
              src="https://www.svgrepo.com/show/303108/google-icon-logo.svg"
              alt="Google logo"
              className="mr-3 h-5 w-5"
            />
            Sign in with Google
          </button>
          {/* Add other OAuth providers if configured */}
          {/* <button
            onClick={() => signIn("github", { callbackUrl: "/" })}
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <img src="https://www.svgrepo.com/show/349405/github.svg" alt="GitHub logo" className="h-5 w-5 mr-3" />
            Sign in with GitHub
          </button> */}
        </div>

        <div className="relative flex items-center py-5">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 flex-shrink text-gray-400">Or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Credentials Login Form */}
        <form onSubmit={handleCredentialsSignIn} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
            >
              Sign in with Email & Password
            </button>
          </div>
        </form>

        <div className="relative flex items-center py-5">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 flex-shrink text-gray-400">Or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Magic Link Sign In */}
        <form onSubmit={handleMagicLinkSignIn} className="space-y-4">
          <div>
            <label
              htmlFor="magic-email"
              className="block text-sm font-medium text-gray-700"
            >
              Email for Magic Link
            </label>
            <div className="mt-1">
              <input
                id="magic-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
            >
              Email me a Sign-in Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
