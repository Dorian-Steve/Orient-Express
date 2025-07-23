"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Code, Cpu, Database, Globe, Smartphone, Zap } from "lucide-react"

const academicPaths = [
  {
    id: 1,
    title: "Computer Science",
    description: "Master programming, algorithms, and software development",
    icon: Code,
    duration: "3 years",
    level: "Bachelor",
    details: {
      overview:
        "Our Computer Science program provides a comprehensive foundation in programming, algorithms, data structures, and software engineering principles.",
      curriculum: [
        "Programming Fundamentals (Python, Java, C++)",
        "Data Structures and Algorithms",
        "Software Engineering",
        "Database Systems",
        "Web Development",
        "Mobile App Development",
      ],
      careerProspects: [
        "Software Developer",
        "Full-Stack Developer",
        "Systems Analyst",
        "Technical Lead",
        "Software Architect",
      ],
      prerequisites: ["High School Diploma", "Mathematics (Advanced Level)", "Basic Computer Literacy"],
    },
  },
  {
    id: 2,
    title: "Network Engineering",
    description: "Design and manage network infrastructure and security",
    icon: Globe,
    duration: "3 years",
    level: "Bachelor",
    details: {
      overview:
        "Learn to design, implement, and maintain complex network infrastructures with a focus on security and performance optimization.",
      curriculum: [
        "Network Fundamentals",
        "Routing and Switching",
        "Network Security",
        "Wireless Technologies",
        "Network Administration",
        "Cloud Networking",
      ],
      careerProspects: [
        "Network Engineer",
        "Network Administrator",
        "Security Specialist",
        "Cloud Network Architect",
        "IT Infrastructure Manager",
      ],
      prerequisites: ["High School Diploma", "Mathematics", "Physics (Recommended)"],
    },
  },
  {
    id: 3,
    title: "Data Science",
    description: "Analyze data and build intelligent systems",
    icon: Database,
    duration: "3 years",
    level: "Bachelor",
    details: {
      overview:
        "Combine statistics, programming, and domain expertise to extract insights from data and build predictive models.",
      curriculum: [
        "Statistics and Probability",
        "Python for Data Science",
        "Machine Learning",
        "Data Visualization",
        "Big Data Technologies",
        "Business Intelligence",
      ],
      careerProspects: [
        "Data Scientist",
        "Data Analyst",
        "Machine Learning Engineer",
        "Business Intelligence Analyst",
        "Research Scientist",
      ],
      prerequisites: ["High School Diploma", "Mathematics (Advanced Level)", "Statistics (Recommended)"],
    },
  },
  {
    id: 4,
    title: "Mobile Development",
    description: "Create innovative mobile applications",
    icon: Smartphone,
    duration: "2 years",
    level: "Diploma",
    details: {
      overview:
        "Specialize in creating mobile applications for iOS and Android platforms using modern development frameworks.",
      curriculum: [
        "Mobile UI/UX Design",
        "iOS Development (Swift)",
        "Android Development (Kotlin)",
        "Cross-platform Development",
        "Mobile App Testing",
        "App Store Optimization",
      ],
      careerProspects: [
        "Mobile App Developer",
        "iOS Developer",
        "Android Developer",
        "Mobile UI/UX Designer",
        "Mobile Product Manager",
      ],
      prerequisites: ["High School Diploma", "Basic Programming Knowledge", "Creative Problem Solving"],
    },
  },
  {
    id: 5,
    title: "Cybersecurity",
    description: "Protect digital assets and information systems",
    icon: Zap,
    duration: "3 years",
    level: "Bachelor",
    details: {
      overview:
        "Learn to protect organizations from cyber threats through comprehensive security strategies and technologies.",
      curriculum: [
        "Information Security Fundamentals",
        "Ethical Hacking",
        "Digital Forensics",
        "Risk Management",
        "Incident Response",
        "Security Compliance",
      ],
      careerProspects: [
        "Cybersecurity Analyst",
        "Security Engineer",
        "Penetration Tester",
        "Security Consultant",
        "Chief Information Security Officer",
      ],
      prerequisites: ["High School Diploma", "Mathematics", "Computer Fundamentals"],
    },
  },
  {
    id: 6,
    title: "Embedded Systems",
    description: "Design hardware and software integration",
    icon: Cpu,
    duration: "3 years",
    level: "Bachelor",
    details: {
      overview:
        "Focus on the design and development of embedded systems that combine hardware and software components.",
      curriculum: [
        "Microcontroller Programming",
        "Digital Electronics",
        "Real-time Systems",
        "IoT Development",
        "Hardware Design",
        "System Integration",
      ],
      careerProspects: [
        "Embedded Systems Engineer",
        "Hardware Engineer",
        "IoT Developer",
        "Firmware Engineer",
        "Systems Integration Specialist",
      ],
      prerequisites: ["High School Diploma", "Mathematics", "Physics"],
    },
  },
]

export function AcademicsGrid() {
  const [selectedPath, setSelectedPath] = useState<(typeof academicPaths)[0] | null>(null)

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {academicPaths.map((path) => (
          <Card
            key={path.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedPath(path)}
          >
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <path.icon className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl">{path.title}</CardTitle>
              <div className="flex gap-2">
                <Badge variant="secondary">{path.level}</Badge>
                <Badge variant="outline">{path.duration}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">{path.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedPath} onOpenChange={() => setSelectedPath(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          {selectedPath && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3 text-2xl">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <selectedPath.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  {selectedPath.title}
                </DialogTitle>
                <DialogDescription className="text-lg">{selectedPath.description}</DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Program Overview</h3>
                  <p className="text-gray-600">{selectedPath.details.overview}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Curriculum</h3>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {selectedPath.details.curriculum.map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Career Prospects</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPath.details.careerProspects.map((career, index) => (
                      <Badge key={index} variant="secondary">
                        {career}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Prerequisites</h3>
                  <ul className="space-y-1">
                    {selectedPath.details.prerequisites.map((prereq, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span className="text-gray-600">{prereq}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
