import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { ProtectedRoute } from "@/components/protected-route";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ProtectedRoute
        requiresAuth={true}
        fallbackTitle="Admin Access Required"
        fallbackDescription="You need administrator privileges to access this section."
      >
        <main className="pt-20">
          <AdminDashboard />
        </main>
      </ProtectedRoute>
    </div>
  );
}
