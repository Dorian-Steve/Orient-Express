"use client";
import {
  ChevronRight,
  Play,
  Target,
  BookOpen,
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-20 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h1 className="mb-6 text-4xl leading-tight font-bold text-gray-900 sm:text-5xl lg:text-6xl dark:text-white">
              Nous visons toujours
              <span className="text-emerald-600 dark:text-emerald-400">
                {" "}
                l'excellence
              </span>
              <span className="text-blue-600 dark:text-blue-400">
                {" "}
                académique
              </span>
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-gray-600 sm:text-xl dark:text-gray-300">
              Commencez votre parcours d'orientation avec notre plateforme
              innovative.
            </p>

            <div className="mb-12 flex flex-col gap-4 sm:flex-row">
              <Button className="px-8 py-4 text-lg">
                <span className="font-semibold">Commencer</span>
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="px-8 py-4 text-lg">
                <Play className="mr-2 h-5 w-5" />
                <span className="font-semibold">Visite virtuelle</span>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
              {/* Feature items with dark mode classes */}
              <div className="rounded-lg bg-white p-4 text-center dark:bg-gray-800">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 sm:h-12 sm:w-12 dark:bg-emerald-900/30">
                  <Target className="h-5 w-5 text-emerald-600 sm:h-6 sm:w-6 dark:text-emerald-400" />
                </div>
                <h3 className="mb-1 text-sm font-semibold text-gray-900 sm:text-base dark:text-white">
                  Orientation personnalisée
                </h3>
                <p className="text-xs text-gray-600 sm:text-sm dark:text-gray-400">
                  Conseils adaptés
                </p>
              </div>
              {/* Other feature items */}
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-800">
              <img
                src="/api/placeholder/600/400"
                alt="Étudiants IUT Douala"
                className="h-96 w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              <div className="absolute right-6 bottom-6 left-6">
                <div className="rounded-xl bg-white/90 p-4 backdrop-blur-sm dark:bg-gray-700/90">
                  <p className="mb-1 text-sm font-medium text-gray-900 dark:text-white">
                    Test d'orientation
                  </p>
                  <div className="flex items-center text-emerald-600 dark:text-emerald-400">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    <span className="text-sm font-medium">
                      2000+ étudiants orientés
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
