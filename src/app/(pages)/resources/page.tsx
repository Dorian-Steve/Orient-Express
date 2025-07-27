import { ResourcesContent } from "@/components/resources-content";
import { ProtectedRoute } from "@/components/protected-route";

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ProtectedRoute
        requiresAuth={true}
        requiresSchoolId={true}
        fallbackTitle="Access Restricted"
        fallbackDescription="You need to be logged in with a valid School ID to access resources."
      >
        <main className="pt-20">
          <ResourcesContent />
        </main>
      </ProtectedRoute>
    </div>
  );
}
