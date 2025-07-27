import { EventsContent } from "@/components/events-content";
import { ProtectedRoute } from "@/components/protected-route";

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ProtectedRoute
        requiresAuth={true}
        requiresSchoolId={true}
        fallbackTitle="Access Restricted"
        fallbackDescription="You need to be logged in with a valid School ID to access events and opportunities."
      >
        <main className="pt-20">
          <EventsContent />
        </main>
      </ProtectedRoute>
    </div>
  );
}
