import { ProgramCard } from "@/components/ui/programCard";
import { programs } from "@/components/data/programs";

export const Programs = () => (
  <section className="py-20">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-4xl font-bold text-gray-900">
          Nos formations d'excellence
        </h2>
        <p className="mx-auto max-w-3xl text-xl text-gray-600">
          Découvrez nos programmes de formation...
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {programs.map((program, index) => (
          <ProgramCard key={index} program={program} />
        ))}
      </div>
    </div>
  </section>
);
