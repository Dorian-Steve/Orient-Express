// src/components/providers/auth-provider.tsx
"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { SessionProvider, useSession, signOut } from "next-auth/react";

export type UserRole = "STUDENT" | "ADVISOR" | "ADMIN";

export type AuthUser = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string | null;
  role: UserRole;
  profileCompleted: boolean;
};

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  userRole: UserRole | "GUEST" | undefined;
  status: "loading" | "authenticated" | "unauthenticated";
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Internal provider that uses useSession
const AuthProviderInternal = ({ children }: { children: ReactNode }) => {
  const { data: session, status: sessionStatus } = useSession();

  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole | "GUEST" | undefined>(
    undefined,
  );
  const [status, setStatus] = useState<
    "loading" | "authenticated" | "unauthenticated"
  >("loading");

  useEffect(() => {
    if (sessionStatus === "loading") {
      setStatus("loading");
      setUser(null);
      setIsAuthenticated(false);
      setUserRole(undefined);
    } else if (sessionStatus === "authenticated" && session?.user) {
      const currentUser: AuthUser = {
        id: session.user.id as string,
        email: session.user.email as string,
        firstName: session.user.firstName || null,
        lastName: session.user.lastName || null,
        imageUrl: session.user.imageUrl || null,
        role: (session.user.role as UserRole) || "STUDENT",
        profileCompleted: session.user.profileCompleted || false,
      };

      setUser(currentUser);
      setIsAuthenticated(true);
      setUserRole(currentUser.role);
      setStatus("authenticated");
    } else {
      setUser(null);
      setIsAuthenticated(false);
      setUserRole("GUEST");
      setStatus("unauthenticated");
    }
  }, [session, sessionStatus]);

  const logout = async () => {
    try {
      await signOut({ callbackUrl: "/sign-in" });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const value = React.useMemo(
    () => ({
      user,
      isAuthenticated,
      userRole,
      status,
      logout,
    }),
    [user, isAuthenticated, userRole, status, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Main provider that wraps both SessionProvider and AuthProviderInternal
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <AuthProviderInternal>{children}</AuthProviderInternal>
    </SessionProvider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
