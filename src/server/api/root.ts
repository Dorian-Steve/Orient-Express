// src/server/api/root.ts
import { createTRPCRouter } from "@/server/api/trpc"; // Ensure this path is correct
import { authRouter } from "@/server/api/routers/auth"; // Ensure this path is correct

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  // Mount your individual routers here.
  // The 'auth' key here corresponds to the 'auth' in 'auth.student.signup'
  auth: authRouter,
});

// Export type definition of API for client-side usage
export type AppRouter = typeof appRouter;
