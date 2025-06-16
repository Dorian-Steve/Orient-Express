import Link from "next/link";
// import { LatestPost } from "@/app/_components/post";
import { api, HydrateClient } from "@/trpc/server";
import { Hero } from "@/app/_components/hero";
import { FeatureCard } from "@/app/_components/feature";
import { Programs } from "@/app/_components/programs";
import { StaffCard } from "@/app/_components/staaffCard";
// import { Testimonials } from "@/app/_components/testimonials";

export default async function Home() {
  return (
    <main className="text-gray-650 min-h-screen dark:text-gray-300">
      <Hero />
      <Programs />
      {/* <Testimonials /> */}
    </main>
  );
}
