"use client";

import type React from "react";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/components/providers/auth-provider";
import { User, GraduationCap, Target } from "lucide-react";

export function ProfileContent() {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ")[1] || "",
    email: user?.email || "",
    schoolId: user?.schoolId || "",
    speciality: user?.speciality || "",
    academicBackground: user?.academicBackground || "",
    phone: "",
    dateOfBirth: "",
    address: "",
    city: "Douala",
    country: "Cameroon",
    highSchool: "",
    graduationYear: "",
    subjects: [] as string[],
    interests: [] as string[],
    careerGoals: "",
    preferredLearningStyle: "",
    technicalSkills: [] as string[],
    languages: [] as string[],
  });

  const subjectOptions = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Computer Science",
    "English",
    "French",
    "Economics",
    "Philosophy",
    "History",
  ];

  const interestOptions = [
    "Programming",
    "Web Development",
    "Mobile Apps",
    "Data Science",
    "AI/ML",
    "Cybersecurity",
    "Networking",
    "Game Development",
    "Robotics",
    "IoT",
  ];

  const technicalSkillOptions = [
    "Python",
    "JavaScript",
    "Java",
    "C++",
    "HTML/CSS",
    "React",
    "Node.js",
    "SQL",
    "Git",
    "Linux",
    "Photoshop",
    "Microsoft Office",
  ];

  const languageOptions = [
    "French",
    "English",
    "German",
    "Spanish",
    "Arabic",
    "Chinese",
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (
    field: string,
    value: string,
    checked: boolean,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: checked
        ? [...(prev[field as keyof typeof prev] as string[]), value]
        : (prev[field as keyof typeof prev] as string[]).filter(
            (item) => item !== value,
          ),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Update user profile
    updateProfile({
      name: `${formData.firstName} ${formData.lastName}`,
      schoolId: formData.schoolId,
      speciality: formData.speciality,
      academicBackground: formData.academicBackground,
      profileComplete: isProfileComplete,
    });

    // Show success message
    alert("Profile updated successfully!");
  };

  const isProfileComplete =
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.schoolId &&
    formData.speciality &&
    formData.academicBackground &&
    formData.phone &&
    formData.careerGoals;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            User Profile
          </h1>
          <p className="text-lg text-gray-600">
            Complete your profile to get personalized recommendations and access
            the orientation system.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Basic information about yourself
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="schoolId">School ID *</Label>
                  <Input
                    id="schoolId"
                    value={formData.schoolId}
                    onChange={(e) =>
                      handleInputChange(
                        "schoolId",
                        e.target.value.toUpperCase(),
                      )
                    }
                    placeholder="IUT2024001"
                    required
                  />
                  <p className="text-sm text-gray-500">
                    Format: IUT followed by 7 digits
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="speciality">Speciality *</Label>
                  <Select
                    value={formData.speciality}
                    onValueChange={(value) =>
                      handleInputChange("speciality", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your speciality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Computer Science">
                        Computer Science
                      </SelectItem>
                      <SelectItem value="Electrical Engineering">
                        Electrical Engineering
                      </SelectItem>
                      <SelectItem value="Mechanical Engineering">
                        Mechanical Engineering
                      </SelectItem>
                      <SelectItem value="Civil Engineering">
                        Civil Engineering
                      </SelectItem>
                      <SelectItem value="Data Science">Data Science</SelectItem>
                      <SelectItem value="Network Engineering">
                        Network Engineering
                      </SelectItem>
                      <SelectItem value="Cybersecurity">
                        Cybersecurity
                      </SelectItem>
                      <SelectItem value="Software Engineering">
                        Software Engineering
                      </SelectItem>
                      <SelectItem value="Information Systems">
                        Information Systems
                      </SelectItem>
                      <SelectItem value="Telecommunications">
                        Telecommunications
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="academicBackground">
                    Academic Background *
                  </Label>
                  <Select
                    value={formData.academicBackground}
                    onValueChange={(value) =>
                      handleInputChange("academicBackground", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your academic background" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Baccalaureate A">
                        Baccalaureate A
                      </SelectItem>
                      <SelectItem value="Baccalaureate C">
                        Baccalaureate C
                      </SelectItem>
                      <SelectItem value="Baccalaureate D">
                        Baccalaureate D
                      </SelectItem>
                      <SelectItem value="Baccalaureate S">
                        Baccalaureate S
                      </SelectItem>
                      <SelectItem value="High School Diploma">
                        High School Diploma
                      </SelectItem>
                      <SelectItem value="Bachelor's Degree in Science">
                        Bachelor's Degree in Science
                      </SelectItem>
                      <SelectItem value="Bachelor's Degree in Engineering">
                        Bachelor's Degree in Engineering
                      </SelectItem>
                      <SelectItem value="Technical Certificate">
                        Technical Certificate
                      </SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) =>
                      handleInputChange("dateOfBirth", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Academic Background */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Academic Background
              </CardTitle>
              <CardDescription>
                Your educational history and achievements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="highSchool">High School *</Label>
                  <Input
                    id="highSchool"
                    value={formData.highSchool}
                    onChange={(e) =>
                      handleInputChange("highSchool", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="graduationYear">Graduation Year</Label>
                  <Select
                    value={formData.graduationYear}
                    onValueChange={(value) =>
                      handleInputChange("graduationYear", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from(
                        { length: 10 },
                        (_, i) => new Date().getFullYear() - i,
                      ).map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Subjects Studied</Label>
                <div className="grid gap-2 md:grid-cols-3">
                  {subjectOptions.map((subject) => (
                    <div key={subject} className="flex items-center space-x-2">
                      <Checkbox
                        id={`subject-${subject}`}
                        checked={formData.subjects.includes(subject)}
                        onCheckedChange={(checked) =>
                          handleArrayChange(
                            "subjects",
                            subject,
                            checked as boolean,
                          )
                        }
                      />
                      <Label htmlFor={`subject-${subject}`} className="text-sm">
                        {subject}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interests & Goals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Interests & Career Goals
              </CardTitle>
              <CardDescription>
                Help us understand your interests and aspirations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Areas of Interest</Label>
                <div className="grid gap-2 md:grid-cols-3">
                  {interestOptions.map((interest) => (
                    <div key={interest} className="flex items-center space-x-2">
                      <Checkbox
                        id={`interest-${interest}`}
                        checked={formData.interests.includes(interest)}
                        onCheckedChange={(checked) =>
                          handleArrayChange(
                            "interests",
                            interest,
                            checked as boolean,
                          )
                        }
                      />
                      <Label
                        htmlFor={`interest-${interest}`}
                        className="text-sm"
                      >
                        {interest}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="careerGoals">Career Goals *</Label>
                <Textarea
                  id="careerGoals"
                  value={formData.careerGoals}
                  onChange={(e) =>
                    handleInputChange("careerGoals", e.target.value)
                  }
                  placeholder="Describe your career aspirations and what you hope to achieve..."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferredLearningStyle">
                  Preferred Learning Style
                </Label>
                <Select
                  value={formData.preferredLearningStyle}
                  onValueChange={(value) =>
                    handleInputChange("preferredLearningStyle", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your learning style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="visual">
                      Visual (diagrams, charts, images)
                    </SelectItem>
                    <SelectItem value="auditory">
                      Auditory (lectures, discussions)
                    </SelectItem>
                    <SelectItem value="kinesthetic">
                      Kinesthetic (hands-on, practical)
                    </SelectItem>
                    <SelectItem value="reading">
                      Reading/Writing (text-based)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Skills & Languages */}
          <Card>
            <CardHeader>
              <CardTitle>Skills & Languages</CardTitle>
              <CardDescription>
                Your current technical skills and language proficiency
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Technical Skills</Label>
                <div className="grid gap-2 md:grid-cols-3">
                  {technicalSkillOptions.map((skill) => (
                    <div key={skill} className="flex items-center space-x-2">
                      <Checkbox
                        id={`skill-${skill}`}
                        checked={formData.technicalSkills.includes(skill)}
                        onCheckedChange={(checked) =>
                          handleArrayChange(
                            "technicalSkills",
                            skill,
                            checked as boolean,
                          )
                        }
                      />
                      <Label htmlFor={`skill-${skill}`} className="text-sm">
                        {skill}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Languages</Label>
                <div className="grid gap-2 md:grid-cols-3">
                  {languageOptions.map((language) => (
                    <div key={language} className="flex items-center space-x-2">
                      <Checkbox
                        id={`language-${language}`}
                        checked={formData.languages.includes(language)}
                        onCheckedChange={(checked) =>
                          handleArrayChange(
                            "languages",
                            language,
                            checked as boolean,
                          )
                        }
                      />
                      <Label
                        htmlFor={`language-${language}`}
                        className="text-sm"
                      >
                        {language}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Status */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Profile Completion Status</h3>
                  <p className="text-sm text-gray-600">
                    {isProfileComplete
                      ? "Your profile is complete! You can now access the orientation system."
                      : "Please complete all required fields to access the orientation system."}
                  </p>
                </div>
                <div
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    isProfileComplete
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {isProfileComplete ? "Complete" : "Incomplete"}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button type="submit" size="lg" className="px-8">
              Save Profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
