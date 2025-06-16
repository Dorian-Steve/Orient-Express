import { Program } from "@/types/types";

interface ProgramCardProps {
  program: Program;
}

export const ProgramCard = ({ program }: ProgramCardProps) => (
  <div className="transform rounded-2xl border border-gray-100 bg-white p-6 shadow-lg transition-all hover:-translate-y-2 hover:shadow-xl">
    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
      {program.icon}
    </div>
    <h3 className="mb-2 text-xl font-bold text-gray-900">{program.title}</h3>
    <p className="mb-4 text-gray-600">{program.description}</p>
    <div className="flex items-center justify-between text-sm">
      <span className="rounded-full bg-emerald-100 px-3 py-1 font-medium text-emerald-800">
        {program.level}
      </span>
      <span className="text-gray-500">{program.duration}</span>
    </div>
    <button className="mt-4 w-full rounded-lg bg-gray-50 py-2 font-medium text-gray-700 transition-colors hover:bg-emerald-50 hover:text-emerald-700">
      En savoir plus
    </button>
  </div>
);
