"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { FaGoogle } from "react-icons/fa"; // Using react-icons for Google icon
import { motion } from "framer-motion"; // Import motion for animations

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader } from "@/components/shared/loader";

import { studentSignUpFormSchema } from "@/lib/validations/auth-validators"; // Import the simplified schema
import type { SignUpFormValues } from "@/types/user.types"; // Import type
import { useUser } from "@/hooks/useUser"; // Import the hook

export default function SignUpPage() {
  const router = useRouter();
  const { signUp, isLoading: isSigningUp } = useUser(); // Use isSigningUp from hook
  const [isGoogleLoading, setIsGoogleLoading] = useState(false); // Separate loading for Google

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(studentSignUpFormSchema),
    mode: "onChange", // Validate on change for better UX
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      schoolId: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    console.log("Form submitted:", data);
    // The useUser hook's signUp mutation will handle the API call and redirection
    await signUp(data);
    // useUser hook handles success/error toasts and redirection.
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      const result = await signIn("google", {
        redirect: false,
        callbackUrl: "/",
      });

      if (result?.error) {
        toast.error("Google Sign Up Failed", {
          description:
            result.error || "Something went wrong with Google sign-up.",
        });
      } else if (result?.ok) {
        toast.success("Signed Up with Google Successfully!", {
          description: "Redirecting...",
        });
        router.push("/"); // Redirect on successful Google sign-in
      }
    } catch (error) {
      console.error("Google sign-up error:", error);
      toast.error("An unexpected error occurred.", {
        description: "Please try again later.",
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const welcomeVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const isFormLoading = isSigningUp || isGoogleLoading; // Combined loading state

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
        {/* Welcome Message */}
        <motion.div initial="hidden" animate="visible" className="text-center">
          <h1 className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white">
            Join Orient Express!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Create your account in just a few steps.
          </p>
        </motion.div>

        <div className="text-center">
          <h2 className="text-foreground mt-6 text-3xl font-bold tracking-tight">
            Create your account
          </h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Or{" "}
            <Link
              href="/sign-in"
              className="text-primary font-medium hover:underline"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 space-y-6"
          >
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      disabled={isFormLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* First Name Field */}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      id="firstName"
                      type="text"
                      autoComplete="given-name"
                      placeholder="John"
                      disabled={isFormLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Last Name Field */}
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      id="lastName"
                      type="text"
                      autoComplete="family-name"
                      placeholder="Doe"
                      disabled={isFormLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* School ID Field */}
            <FormField
              control={form.control}
              name="schoolId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>School ID</FormLabel>
                  <FormControl>
                    <Input
                      id="schoolId"
                      type="text"
                      autoComplete="off" // No standard autocomplete for school ID
                      placeholder="e.g., STU12345, AM987, AV654"
                      disabled={isFormLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      id="password"
                      type="password"
                      autoComplete="new-password"
                      placeholder="••••••••"
                      disabled={isFormLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password Field */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      id="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      placeholder="••••••••"
                      disabled={isFormLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div>
              <Button
                type="submit"
                className="group relative flex w-full justify-center"
                disabled={isFormLoading} // Use combined loading state
              >
                {isSigningUp && (
                  <Loader size="sm" className="absolute left-3" />
                )}
                Sign Up
              </Button>
            </div>
          </form>
        </Form>

        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <div className="border-border w-full border-t" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-card text-muted-foreground px-2">
              Or continue with
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          className="mt-6 flex w-full items-center justify-center space-x-2"
          onClick={handleGoogleSignIn}
          disabled={isFormLoading} // Use combined loading state
        >
          {isGoogleLoading ? (
            <Loader size="sm" />
          ) : (
            <>
              <FaGoogle className="h-5 w-5" />
              <span>Sign up with Google</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
