// hooks/useUser.ts
"use client";

import AuthError from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { toast } from "@/components/ui/sonner";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth/auth.store";
import { api } from "@/trpc/react";
import type { SignInFormValues, SignUpFormValues } from "@/types/user.types";
import { useCallback, useMemo } from "react";

export const useUser = () => {
  const router = useRouter();
  const utils = api.useUtils();
  const {
    profile,
    isLoading,
    error,

    setProfile,
    setLoading,
    setError,
    reset,
  } = useAuthStore();

  // Sign up mutation (remains the same as it interacts with your TRPC API)
  const signUpMutation = api.auth.student.signup.useMutation({
    onSuccess: async ({ data }) => {
      await utils.auth.student.invalidate();

      if (data.emailSent) toast.success("Registration successful!");
      router.push("/sign-in");
    },
    onError: (error) => {
      const errorMessage = error.message || "Registration failed. Please try again.";
      toast.error(errorMessage);
    },
  });

  // Sign in function - now directly uses next-auth/react's signIn
  const onSignIn = async (values: SignInFormValues) => {
    try {
      setLoading(true);
      setError(null);

      // Directly call next-auth's signIn function with 'credentials' provider
      const result = await signIn("credentials", {
        redirect: false, // Prevent NextAuth from redirecting automatically
        email: values.email,
        password: values.password,
      });

      if (result?.error) {
        // Handle NextAuth errors
        let errorMessage = "Sign in failed. Please check your credentials.";
        if (result.error === "CredentialsSignin") {
            errorMessage = "Invalid email or password.";
        } else if (result.error === "EmailNotVerified") { // Assuming your backend returns this specific error message
            errorMessage = "Email not verified. Please check your inbox.";
        }
        toast.error(errorMessage);
        setError(new AuthError(result.error)); // Set a more specific error if needed
      } else if (result?.ok) {
        // On successful sign-in, NextAuth automatically updates the session.
        // You might want to refetch user profile or rely on useSession in AuthProvider
        // to update the profile in useAuthStore. For immediate update, you can trigger a refetch.
        // For now, let's assume AuthProvider's useSession handles profile updates.
        toast.success("Sign in successful!");
        router.replace("/"); // Redirect to home or dashboard after successful sign-in
      }
    } catch (error) {
      setLoading(false);
      toast.error("An unexpected error occurred during sign in.");
      console.error("Detailed sign in error:", {
        error,
        values: { email: values.email, hasPassword: !!values.password },
        timestamp: new Date().toISOString(),
      });
      if (error instanceof AuthError) {
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  // Email verification mutation (remains the same as it interacts with your TRPC API)
  const verifyEmailMutation = api.auth.verifyEmail.useMutation({
    onSuccess: async (result) => {
      if (result.success) {
        if (result.data?.emailVerified) {
          toast.success("Email successfully verified!");
          router.push("/sign-in");
        } else if (result.data?.emailSent) {
          toast.success("Verification email sent! Please check your inbox.");
        }
      } else {
        toast.error("Email verification failed.");
      }
    },
    onError: (error) => {
      console.error("Email verification error:", error);
      toast.error(error.message || "Email verification failed. Please try again.");
    },
  });

  // Sign out function - now directly uses next-auth/react's signOut
  const onSignOut = async () => {
    try {
      setLoading(true);
      setError(null); // Clear previous errors
      // Directly call next-auth's signOut function
      await signOut({ callbackUrl: "/sign-in" }); // Redirect to sign-in page after logout

      reset(); // Reset auth store state
      toast.success("Successfully logged out.");
      // The callbackUrl in signOut handles the redirection, so router.push is redundant here
    } catch (error) {
      setLoading(false);
      if (error instanceof AuthError) {
        setError(error);
        toast.error("Sign out failed. Please try again.");
      } else {
        toast.error("An unexpected error occurred during sign out.");
      }
      console.error("Detailed sign out error:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    profile,
    isLoading: isLoading || signUpMutation.isPending,
    error,
    isAuthenticated: !!profile,
    signUp: signUpMutation.mutateAsync,
    signIn: onSignIn,
    signOut: onSignOut,
    verifyEmail: verifyEmailMutation.mutateAsync,
  };
};
