"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Google } from "@/lib/icons/Google";
// Removed: import { motion } from "framer-motion"; // No longer needed for welcome message animation

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

import { signInFormSchema } from "@/lib/validations/auth-validators";
import type { SignInFormValues } from "@/types/user.types";

export default function SignInPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignInFormValues) => {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (result?.error) {
        toast.error("Sign In Failed", {
          description: result.error || "Invalid email or password.",
        });
      } else {
        toast.success("Signed In Successfully!", {
          description: "Redirecting to your dashboard...",
        });
        router.push("/"); // Redirect to home/dashboard
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      toast.error("An unexpected error occurred.", {
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await signIn("google", {
        redirect: false,
        callbackUrl: "/",
      });

      if (result?.error) {
        toast.error("Google Sign In Failed", {
          description:
            result.error || "Something went wrong with Google sign-in.",
        });
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast.error("An unexpected error occurred.", {
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Removed: welcomeVariants constant as motion.div is removed

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
        {/* Welcome Message (now static) */}
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white">
            Welcome Back!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Sign in to continue your journey.
          </p>
        </div>

        <div className="text-center">
          <h2 className="text-foreground mt-6 text-3xl font-bold tracking-tight">
            Sign in to your account
          </h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Or{" "}
            <Link
              href="/sign-up"
              className="text-primary font-medium hover:underline"
            >
              create a new account
            </Link>
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 space-y-6"
          >
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
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                      autoComplete="current-password"
                      placeholder="••••••••"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <Button
                type="submit"
                className="group relative flex w-full justify-center"
                disabled={isLoading}
              >
                {isLoading && <Loader size="sm" className="absolute left-3" />}
                Sign In
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
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader size="sm" />
          ) : (
            <>
              <Google className="h-5 w-5" />
              <span>Sign in with Google</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
