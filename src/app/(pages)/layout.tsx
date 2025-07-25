"use client";

import { Navbar } from "@/components/shared/Nav/Navbar";
import { useAuth } from "@/components/providers/auth-provider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useAuth();

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
