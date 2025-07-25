// src/types/user.types.ts

import { z } from "zod";
import { type StoreApi } from "zustand";
import { TRPCError } from "@trpc/server";
import { AuthError } from "@auth/core/errors"; // Keep this if @auth/core/errors works, otherwise revert to generic Error

// --- User Profile Type ---
export interface UserProfile {
  id?: string;
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  imageUrl?: string | null;
  schoolId?: string | null;
  role?: "ADMIN" | "ADVISOR" | "STUDENT" | "GUEST";
  profileCompleted?: boolean;
}

// --- Form Value Types ---
import { signInFormSchema, studentSignUpFormSchema } from "@/lib/validations/auth-validators";

export type SignInFormValues = z.infer<typeof signInFormSchema>;
export type SignUpFormValues = z.infer<typeof studentSignUpFormSchema>; // This type will now reflect the simplified schema


// --- Zustand Auth Store Type ---
export interface AuthState {
  profile: UserProfile | null;
  isLoading: boolean;
  isInitialized: boolean;
  error: TRPCError | AuthError | null;
  lastActivity: number | null;
  isAuthenticated: boolean;
}

export interface AuthActions {
  setProfile: (profile: UserProfile | null) => void;
  setLoading: (isLoading: boolean) => void;
  setInitialized: (isInitialized: boolean) => void;
  setError: (error: TRPCError | AuthError | null) => void;
  updateLastActivity: () => void;
  reset: () => void;
}

export type AuthStore = AuthState & AuthActions;

export type AuthStateCreator = StoreApi<AuthStore>;
