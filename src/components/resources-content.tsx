import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BookOpen,
  Bookmark,
  GraduationCap,
  FileText,
  Briefcase,
  Users,
  Edit,
  ExternalLink,
  HelpCircle,
  MapPin,
  Calendar,
  MessageCircle,
} from "lucide-react";

const academicSupport = [
  {
    icon: BookOpen,
    title: "Study Guides",
    description: "Comprehensive guides to help you excel in your studies.",
  },
  {
    icon: Bookmark,
    title: "Presentation Tips",
    description: "Tips and tricks for delivering impactful presentations.",
  },
  {
    icon: GraduationCap,
    title: "Graduation Requirements",
    description: "Everything you need to know about graduation.",
  },
  {
    icon: FileText,
    title: "Academic Forms",
    description: "Access and download essential academic forms.",
  },
];

const careerDevelopment = [
  {
    icon: Briefcase,
    title: "Internship Opportunities",
    description: "Find exciting internship opportunities in your field.",
  },
  {
    icon: Users,
    title: "Networking Events",
    description:
      "Connect with professionals and peers at our networking events.",
  },
  {
    icon: Edit,
    title: "Resume Writing",
    description: "Craft a compelling resume that highlights your skills.",
  },
  {
    icon: ExternalLink,
    title: "Job Search Links",
    description: "Useful links to external job search platforms.",
  },
];

const generalResources = [
  {
    icon: HelpCircle,
    title: "FAQs",
    description: "Answers to frequently asked questions about IUT Douala.",
  },
  {
    icon: MapPin,
    title: "Campus Map",
    description: "Navigate the campus with ease using our interactive map.",
  },
  {
    icon: Calendar,
    title: "Academic Calendar",
    description: "Important dates and deadlines for the academic year.",
  },
  {
    icon: MessageCircle,
    title: "Student Support Chat",
    description: "Get immediate assistance from our student support team.",
  },
];

export function ResourcesContent() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">
          Resources for Success
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-gray-600">
          Explore a curated collection of documents, articles, and links to
          support your academic and career journey at the University Institute
          of Technology (IUT) of Douala.
        </p>
      </div>

      <div className="space-y-12">
        {/* Academic Support */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Academic Support
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {academicSupport.map((item, index) => (
              <Card
                key={index}
                className="cursor-pointer transition-shadow hover:shadow-lg"
              >
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                    <item.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{item.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Career Development */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Career Development
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {careerDevelopment.map((item, index) => (
              <Card
                key={index}
                className="cursor-pointer transition-shadow hover:shadow-lg"
              >
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                    <item.icon className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{item.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* General Resources */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            General Resources
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {generalResources.map((item, index) => (
              <Card
                key={index}
                className="cursor-pointer transition-shadow hover:shadow-lg"
              >
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                    <item.icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{item.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>

      <footer className="mt-16 border-t border-gray-200 pt-8 text-center text-gray-500">
        <p>
          © 2024 University Institute of Technology (IUT) of Douala. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}
