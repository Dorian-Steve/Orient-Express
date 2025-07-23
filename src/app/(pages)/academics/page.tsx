import { AcademicsGrid } from "@/components/academics-grid";

export default function AcademicsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900">
              Academic Paths
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-gray-600">
              Explore our diverse academic programs designed to prepare you for
              success in technology and innovation.
            </p>
          </div>
          <AcademicsGrid />
        </div>
      </main>
    </div>
  );
}
