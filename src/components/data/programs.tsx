// programs.ts
import { BookOpen, Target, Award, Briefcase } from "lucide-react";
// import { Program } from '../../types';
import { Program } from "@/types/types";

export const programs: Program[] = [
  {
    title: "Génie Informatique",
    description:
      "Formation complète en développement logiciel et systèmes d'information",
    icon: <BookOpen className="h-6 w-6" />,
    duration: "2 ans",
    level: "DUT",
  },
  {
    title: "Génie Électrique",
    description:
      "Électronique, automatisme et systèmes électriques industriels",
    icon: <Target className="h-6 w-6" />,
    duration: "2 ans",
    level: "DUT",
  },
  {
    title: "Génie Civil",
    description: "Construction, BTP et infrastructures urbaines",
    icon: <Award className="h-6 w-6" />,
    duration: "2 ans",
    level: "DUT",
  },
  {
    title: "Gestion Commerciale",
    description: "Management, marketing et commerce international",
    icon: <Briefcase className="h-6 w-6" />,
    duration: "2 ans",
    level: "DUT",
  },
];
