import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Welcome to Orient Express</h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            The Orient Express IUT Douala platform is your gateway to excellence in technology and
            innovation. Our intelligent platform guides you through your academic journey with personalized orientation
            and comprehensive resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-3">
              <Link href="/orientation">Start Your Orientation</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3 bg-transparent">
              <Link href="/academics">Explore Programs</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
