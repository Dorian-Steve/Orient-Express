"use client";

import type React from "react";

import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lock, LogIn } from "lucide-react";
import Link from "next/link";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiresAuth?: boolean;
  requiresSchoolId?: boolean;
  fallbackTitle?: string;
  fallbackDescription?: string;
}

export function ProtectedRoute({
  children,
  requiresAuth = true,
  requiresSchoolId = false,
  fallbackTitle = "Authentication Required",
  fallbackDescription = "Please log in to access this content.",
}: ProtectedRouteProps) {
  const { user } = useAuth();

  // Check if user is logged in when auth is required
  if (requiresAuth && !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <Lock className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle>{fallbackTitle}</CardTitle>
            <CardDescription>{fallbackDescription}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild className="w-full">
              <Link href="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Login to Continue
              </Link>
            </Button>
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="text-blue-600 hover:underline"
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Check if user has valid School ID when required
  if (requiresSchoolId && user && !user.schoolId) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
              <Lock className="h-6 w-6 text-yellow-600" />
            </div>
            <CardTitle>School ID Required</CardTitle>
            <CardDescription>
              You need a valid School ID to access this section. Please complete
              your profile.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild className="w-full">
              <Link href="/profile">Complete Profile</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}
