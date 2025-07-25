// src/stores/auth/auth.store.ts
"use client";

import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { AuthError } from "next-auth"; // Corrected import for AuthError
import { TRPCError } from "@trpc/server"; // Assuming this is the correct import path

import { AuthStore, UserProfile, AuthState, AuthActions } from "@/types/user.types"; // Import types

// Initial state for the authentication store
const initialAuthState: AuthState = {
  profile: null,
  isLoading: false,
  isInitialized: false, // Default to false, will be set to true after hydration/initial check
  error: null,
  lastActivity: null,
  isAuthenticated: false, // Initial state for isAuthenticated
};

export const useAuthStore = create<AuthStore>()(
  subscribeWithSelector(
    persist(
      immer((set, get) => ({
        ...initialAuthState, // Spread initial state

        // --- Actions (formerly in auth.actions.ts) ---
        setProfile: (profile: UserProfile | null) => {
          set((state) => {
            state.profile = profile;
            state.error = null;
            state.isAuthenticated = !!profile; // Update isAuthenticated based on profile presence
            state.isLoading = false; // Assume loading is done when profile is set
          });
        },

        setLoading: (isLoading: boolean) => {
          set((state) => {
            state.isLoading = isLoading;
          });
        },

        setInitialized: (isInitialized: boolean) => {
          set((state) => {
            state.isInitialized = isInitialized;
          });
        },

        setError: (error: TRPCError | AuthError | null) => {
          set((state) => {
            state.error = error;
            state.isLoading = false; // Assume loading is done if an error occurs
          });
        },

        updateLastActivity: () => {
          set((state) => {
            state.lastActivity = Date.now();
          });
        },

        reset: () => {
          set((state) => {
            state.profile = null;
            state.isLoading = false;
            state.isInitialized = true; // Set to true after reset, indicating a known state
            state.error = null;
            state.lastActivity = null;
            state.isAuthenticated = false;
          });
        },
      })),
      {
        name: "auth-storage", // Name for localStorage key
        // Partialize specifies which parts of the state to persist
        // We only persist the profile and lastActivity, as isLoading and error are transient.
        // isInitialized is also not persisted, as its initial value should be false on app load.
        partialize: (state) => ({
          profile: state.profile,
          lastActivity: state.lastActivity,
        }),
        // Optional: onRehydrateStorage can be used for more complex initialization logic
        // onRehydrateStorage: (state) => {
        //   console.log('hydration starts', state);
        //   return (state, error) => {
        //     if (error) {
        //       console.error('an error happened during hydration', error);
        //     } else {
        //       console.log('hydration finished', state);
        //       // Set isInitialized to true after hydration is complete
        //       state?.setInitialized(true);
        //     }
        //   };
        // },
      },
    ),
  ),
);
