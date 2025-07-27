import { AdvisorDashboard } from "@/components/advisor/advisor-dashboard";
import { ProtectedRoute } from "@/components/protected-route";

export default function AdvisorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ProtectedRoute
        requiresAuth={true}
        fallbackTitle="Advisor Access Required"
        fallbackDescription="You need advisor privileges to access this section."
      >
        <main className="pt-20">
          <AdvisorDashboard />
        </main>
      </ProtectedRoute>
    </div>
  );
}
