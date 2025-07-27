import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Calendar, Users, Target } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Intelligent Orientation",
    description:
      "Get personalized academic guidance through our smart evaluation system.",
  },
  {
    icon: BookOpen,
    title: "Academic Excellence",
    description: "Access comprehensive resources and support for your studies.",
  },
  {
    icon: Calendar,
    title: "Opportunities",
    description:
      "Discover internships, seminars, and job opportunities tailored for you.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Connect with peers, faculty, and industry professionals.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Why Choose IUT Douala?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Our platform combines cutting-edge technology with personalized
            support to ensure your academic success.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
