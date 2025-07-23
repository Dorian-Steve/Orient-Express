"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/components/providers/auth-provider";
import {
  CheckCircle,
  ArrowRight,
  Target,
  BookOpen,
  Users,
  Lightbulb,
} from "lucide-react";

const orientationSteps = [
  {
    id: 1,
    title: "Welcome & Introduction",
    description: "Learn about the intelligent orientation system",
    completed: false,
  },
  {
    id: 2,
    title: "Profile Setup",
    description: "Complete your personal and academic profile",
    completed: false,
  },
  {
    id: 3,
    title: "Skills Assessment",
    description: "Evaluate your current skills and interests",
    completed: false,
  },
  {
    id: 4,
    title: "Career Exploration",
    description: "Discover potential career paths",
    completed: false,
  },
  {
    id: 5,
    title: "Personalized Recommendations",
    description: "Receive tailored academic and career guidance",
    completed: false,
  },
];

const benefits = [
  {
    icon: Target,
    title: "Personalized Guidance",
    description:
      "Get recommendations tailored to your unique profile and goals",
  },
  {
    icon: BookOpen,
    title: "Academic Planning",
    description: "Discover the best academic paths for your career objectives",
  },
  {
    icon: Users,
    title: "Peer Connections",
    description: "Connect with students who share similar interests and goals",
  },
  {
    icon: Lightbulb,
    title: "Career Insights",
    description: "Learn about industry trends and future opportunities",
  },
];

export function OrientationContent() {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [hasStarted, setHasStarted] = useState(false);

  const canStartOrientation = user?.profileComplete;

  const handleStartOrientation = () => {
    if (!canStartOrientation) {
      // Redirect to profile completion
      window.location.href = "/profile";
      return;
    }
    setHasStarted(true);
  };

  const handleNextStep = () => {
    if (currentStep < orientationSteps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  if (!hasStarted) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          {/* Hero Section */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900">
              Intelligent Orientation System
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-600">
              Discover your academic path with our AI-powered orientation
              system. Get personalized recommendations based on your skills,
              interests, and career goals.
            </p>

            {!canStartOrientation && (
              <div className="mx-auto mb-8 max-w-2xl rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                <p className="text-yellow-800">
                  <strong>Profile Required:</strong> Please complete your
                  profile before starting the orientation process.
                </p>
              </div>
            )}
          </div>

          {/* Benefits */}
          <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                    <benefit.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{benefit.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Process Overview */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Orientation Process</CardTitle>
              <CardDescription>
                Our intelligent system guides you through a comprehensive
                evaluation process
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orientationSteps.map((step, index) => (
                  <div
                    key={step.id}
                    className="flex items-center gap-4 rounded-lg bg-gray-50 p-4"
                  >
                    <div className="flex-shrink-0">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                        <span className="font-semibold text-blue-600">
                          {step.id}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {step.description}
                      </p>
                    </div>
                    <Badge variant="outline">
                      {index === 0
                        ? "5 min"
                        : index === 1
                          ? "10 min"
                          : index === 2
                            ? "15 min"
                            : index === 3
                              ? "10 min"
                              : "5 min"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <Button
              size="lg"
              className="px-8 py-3 text-lg"
              onClick={handleStartOrientation}
              disabled={!canStartOrientation}
            >
              {canStartOrientation
                ? "Start Your Orientation"
                : "Complete Profile First"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="mt-4 text-sm text-gray-500">
              Estimated time: 45 minutes
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Orientation Process View
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Orientation Process
            </h1>
            <Badge variant="outline">
              Step {currentStep} of {orientationSteps.length}
            </Badge>
          </div>
          <Progress
            value={(currentStep / orientationSteps.length) * 100}
            className="h-2"
          />
        </div>

        {/* Current Step Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <span className="font-semibold text-blue-600">
                  {currentStep}
                </span>
              </div>
              {orientationSteps[currentStep - 1]?.title}
            </CardTitle>
            <CardDescription>
              {orientationSteps[currentStep - 1]?.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  Welcome to IUT Douala Orientation!
                </h3>
                <p className="text-gray-600">
                  Our intelligent orientation system is designed to help you
                  make informed decisions about your academic journey. Through a
                  series of assessments and evaluations, we'll provide
                  personalized recommendations that align with your interests,
                  skills, and career aspirations.
                </p>
                <div className="rounded-lg bg-blue-50 p-4">
                  <h4 className="mb-2 font-semibold text-blue-900">
                    What to Expect:
                  </h4>
                  <ul className="space-y-1 text-sm text-blue-800">
                    <li>• Comprehensive skills and interest assessment</li>
                    <li>• Exploration of academic programs and career paths</li>
                    <li>
                      • Personalized recommendations based on your profile
                    </li>
                    <li>• Introduction to relevant platform resources</li>
                  </ul>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Complete Your Profile</h3>
                <p className="text-gray-600">
                  To provide the most accurate recommendations, we need to know
                  more about your background, interests, and goals. This
                  information will be used to personalize your orientation
                  experience.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border p-4">
                    <h4 className="mb-2 font-semibold">Personal Information</h4>
                    <p className="text-sm text-gray-600">
                      Basic details about yourself
                    </p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h4 className="mb-2 font-semibold">Academic Background</h4>
                    <p className="text-sm text-gray-600">
                      Your educational history and achievements
                    </p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h4 className="mb-2 font-semibold">Interests & Hobbies</h4>
                    <p className="text-sm text-gray-600">
                      What you enjoy doing in your free time
                    </p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h4 className="mb-2 font-semibold">Career Goals</h4>
                    <p className="text-sm text-gray-600">
                      Your aspirations and future plans
                    </p>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Skills Assessment</h3>
                <p className="text-gray-600">
                  This assessment will help us understand your current skill
                  level and identify areas for development.
                </p>
                <div className="space-y-3">
                  <div className="rounded-lg border p-4">
                    <h4 className="mb-2 font-semibold">Technical Skills</h4>
                    <p className="text-sm text-gray-600">
                      Programming, software tools, technical knowledge
                    </p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h4 className="mb-2 font-semibold">Soft Skills</h4>
                    <p className="text-sm text-gray-600">
                      Communication, leadership, problem-solving
                    </p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h4 className="mb-2 font-semibold">Learning Preferences</h4>
                    <p className="text-sm text-gray-600">
                      How you prefer to learn and process information
                    </p>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Career Exploration</h3>
                <p className="text-gray-600">
                  Explore different career paths and understand the academic
                  requirements for each field.
                </p>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-lg border p-4 text-center">
                    <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                      <span className="font-bold text-blue-600">CS</span>
                    </div>
                    <h4 className="font-semibold">Computer Science</h4>
                  </div>
                  <div className="rounded-lg border p-4 text-center">
                    <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                      <span className="font-bold text-green-600">NE</span>
                    </div>
                    <h4 className="font-semibold">Network Engineering</h4>
                  </div>
                  <div className="rounded-lg border p-4 text-center">
                    <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                      <span className="font-bold text-purple-600">DS</span>
                    </div>
                    <h4 className="font-semibold">Data Science</h4>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  Your Personalized Recommendations
                </h3>
                <p className="text-gray-600">
                  Based on your profile and assessment results, here are our
                  recommendations for your academic journey.
                </p>
                <div className="rounded-lg bg-green-50 p-6">
                  <h4 className="mb-4 font-semibold text-green-900">
                    Recommended Academic Path
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-semibold">
                        Computer Science Program
                      </span>
                    </div>
                    <p className="ml-8 text-sm text-green-800">
                      Based on your strong analytical skills and interest in
                      technology, this program aligns perfectly with your career
                      goals.
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Next Steps:</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Explore the Computer Science curriculum in detail</li>
                    <li>• Connect with current students and faculty</li>
                    <li>• Review prerequisite courses</li>
                    <li>• Schedule a meeting with an academic advisor</li>
                  </ul>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                disabled={currentStep === 1}
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                Previous
              </Button>
              <Button onClick={handleNextStep}>
                {currentStep === orientationSteps.length
                  ? "Complete Orientation"
                  : "Next Step"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
