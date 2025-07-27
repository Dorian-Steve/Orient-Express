"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/components/providers/auth-provider";
import {
  Calendar,
  MapPin,
  Users,
  Briefcase,
  GraduationCap,
} from "lucide-react";

const events = [
  {
    id: 1,
    title: "AI & Machine Learning Seminar",
    type: "seminar",
    date: "2024-02-15",
    time: "14:00",
    location: "Amphitheater A",
    description:
      "Explore the latest trends in artificial intelligence and machine learning applications.",
    speaker: "Dr. Marie Kouam",
    capacity: 150,
    registered: 89,
    requiresLogin: false,
    details:
      "Join us for an in-depth exploration of AI technologies and their real-world applications. This seminar will cover machine learning algorithms, neural networks, and practical implementation strategies.",
  },
  {
    id: 2,
    title: "Software Engineering Internship - TechCorp",
    type: "internship",
    date: "2024-03-01",
    time: "Application Deadline",
    location: "Remote/Douala",
    description: "6-month internship opportunity in software development.",
    company: "TechCorp Solutions",
    duration: "6 months",
    stipend: "150,000 FCFA/month",
    requiresLogin: true,
    details:
      "Gain hands-on experience in full-stack development, work with modern technologies, and contribute to real projects. Requirements include proficiency in JavaScript, React, and Node.js.",
  },
  {
    id: 3,
    title: "Career Fair 2024",
    type: "job",
    date: "2024-02-28",
    time: "09:00",
    location: "Main Campus Hall",
    description: "Meet with top employers and explore career opportunities.",
    companies: ["Orange Cameroon", "MTN", "Société Générale", "Total Energies"],
    positions: 45,
    requiresLogin: false,
    details:
      "Connect with leading companies in Cameroon and explore exciting career opportunities. Bring your resume and be prepared for on-the-spot interviews.",
  },
  {
    id: 4,
    title: "Cybersecurity Workshop",
    type: "seminar",
    date: "2024-02-20",
    time: "10:00",
    location: "Computer Lab 2",
    description:
      "Hands-on workshop on ethical hacking and penetration testing.",
    speaker: "Prof. Jean-Claude Mbarga",
    capacity: 30,
    registered: 28,
    requiresLogin: false,
    details:
      "Learn practical cybersecurity skills including vulnerability assessment, penetration testing techniques, and security best practices.",
  },
  {
    id: 5,
    title: "Data Analyst Position - DataFlow Inc",
    type: "job",
    date: "2024-03-15",
    time: "Application Deadline",
    location: "Douala",
    description: "Full-time data analyst position for recent graduates.",
    company: "DataFlow Inc",
    salary: "800,000 - 1,200,000 FCFA/month",
    experience: "0-2 years",
    requiresLogin: true,
    details:
      "Join our dynamic team as a Data Analyst. You'll work with large datasets, create visualizations, and provide insights to drive business decisions. Strong SQL and Python skills required.",
  },
];

export function EventsContent() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("all");

  const filteredEvents = events.filter((event) => {
    if (activeTab === "all") return true;
    return event.type === activeTab;
  });

  const getEventIcon = (type: string) => {
    switch (type) {
      case "seminar":
        return GraduationCap;
      case "internship":
        return Users;
      case "job":
        return Briefcase;
      default:
        return Calendar;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case "seminar":
        return "bg-blue-100 text-blue-600";
      case "internship":
        return "bg-green-100 text-green-600";
      case "job":
        return "bg-purple-100 text-purple-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">
          Events & Opportunities
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-gray-600">
          Discover seminars, internship opportunities, and job openings that
          will advance your career and expand your knowledge.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Events</TabsTrigger>
          <TabsTrigger value="seminar">Seminars</TabsTrigger>
          <TabsTrigger value="internship">Internships</TabsTrigger>
          <TabsTrigger value="job">Jobs</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => {
              const Icon = getEventIcon(event.type);
              const showDetails = !event.requiresLogin || user;

              return (
                <Card
                  key={event.id}
                  className="transition-shadow hover:shadow-lg"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${getEventColor(event.type)}`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <Badge
                        variant={
                          event.type === "seminar"
                            ? "default"
                            : event.type === "internship"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {event.type.charAt(0).toUpperCase() +
                          event.type.slice(1)}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                    <CardDescription>{event.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(event.date).toLocaleDateString()} at{" "}
                        {event.time}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>

                    {event.type === "seminar" && event.capacity && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="h-4 w-4" />
                        <span>
                          {event.registered}/{event.capacity} registered
                        </span>
                      </div>
                    )}

                    {showDetails ? (
                      <div className="space-y-2">
                        <p className="text-sm text-gray-700">{event.details}</p>

                        {event.type === "internship" && (
                          <div className="space-y-1 text-sm">
                            <p>
                              <strong>Company:</strong> {event.company}
                            </p>
                            <p>
                              <strong>Duration:</strong> {event.duration}
                            </p>
                            <p>
                              <strong>Stipend:</strong> {event.stipend}
                            </p>
                          </div>
                        )}

                        {event.type === "job" && event.salary && (
                          <div className="space-y-1 text-sm">
                            <p>
                              <strong>Company:</strong> {event.company}
                            </p>
                            <p>
                              <strong>Salary:</strong> {event.salary}
                            </p>
                            <p>
                              <strong>Experience:</strong> {event.experience}
                            </p>
                          </div>
                        )}

                        <Button className="mt-4 w-full">
                          {event.type === "seminar" ? "Register" : "Apply Now"}
                        </Button>
                      </div>
                    ) : (
                      <div className="py-4 text-center">
                        <p className="mb-3 text-sm text-gray-500">
                          Login to view full details and apply
                        </p>
                        <Button
                          variant="outline"
                          className="w-full bg-transparent"
                        >
                          Login to View Details
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
