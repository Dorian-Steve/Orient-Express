// src/app/(dashboard)/layout.tsx (or src/app/dashboard/layout.tsx)
"use client"; // <--- CRITICAL FIX: Add this line at the very top

import { Navbar } from "@/components/shared/Nav/Navbar";
import { useAuth } from "@/components/providers/auth-provider"; // Keep this import if you need loading status

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The useAuth hook can now be safely used here as DashboardLayout is a client component
  const { status } = useAuth();

  // You can keep a loading state if desired
  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading dashboard...
      </div>
    );
  }

  return (
    <section>
      <Navbar />
      <main className="pt-16">
        {" "}
        {/* Add padding-top to prevent content from going under the fixed Navbar */}
        {children}
      </main>
    </section>
  );
}
