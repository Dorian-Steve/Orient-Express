import type { TRPCError } from "@trpc/server";
import type AuthError  from "next-auth";
import { type StateCreator } from "zustand";

import type { AuthStore, User } from "@/types/user.types";

export const createAuthActions = (
  set: Parameters<StateCreator<AuthStore>>[0],
  get: Parameters<StateCreator<AuthStore>>[1],
) => ({
  setProfile: (profile: User | null) => {
    
  },

  setLoading: (isLoading: boolean) => {
    set({ isLoading });
  },

  setInitialized: (isInitialized: boolean) => {
    set({ isInitialized });
  },

  setError: (error: TRPCError | null) => {
    set({ error });
  },

  updateLastActivity: () => {
    set({ lastActivity: Date.now() });
  },

  reset: () => {
    set({
      profile: null,
      isLoading: false,
      isInitialized: true,
      error: null,
      lastActivity: null,
    });
  },
});
