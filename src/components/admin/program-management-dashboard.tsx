"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Plus, Edit, BookOpen, Users, Clock, Award } from "lucide-react"

// Mock programs data
const mockPrograms = [
  {
    id: "1",
    name: "Computer Science",
    code: "CS",
    description: "Comprehensive program covering software development, algorithms, and computer systems",
    duration: "3 years",
    credits: 180,
    level: "Bachelor",
    department: "Engineering",
    status: "Active",
    enrolledStudents: 245,
    maxCapacity: 300,
    prerequisites: ["Mathematics", "Physics"],
    courses: [
      "Programming Fundamentals",
      "Data Structures",
      "Database Systems",
      "Software Engineering",
      "Computer Networks",
    ],
    createdDate: "2020-09-01",
    lastUpdated: "2024-01-15",
  },
  {
    id: "2",
    name: "Data Science",
    code: "DS",
    description: "Advanced program focusing on data analysis, machine learning, and statistical modeling",
    duration: "3 years",
    credits: 180,
    level: "Bachelor",
    department: "Engineering",
    status: "Active",
    enrolledStudents: 156,
    maxCapacity: 200,
    prerequisites: ["Mathematics", "Statistics"],
    courses: [
      "Statistics for Data Science",
      "Machine Learning",
      "Data Visualization",
      "Big Data Analytics",
      "Python for Data Science",
    ],
    createdDate: "2021-09-01",
    lastUpdated: "2024-01-10",
  },
  {
    id: "3",
    name: "Network Engineering",
    code: "NE",
    description: "Specialized program in network design, security, and infrastructure management",
    duration: "3 years",
    credits: 180,
    level: "Bachelor",
    department: "Engineering",
    status: "Active",
    enrolledStudents: 89,
    maxCapacity: 150,
    prerequisites: ["Mathematics", "Physics"],
    courses: [
      "Network Fundamentals",
      "Routing and Switching",
      "Network Security",
      "Wireless Networks",
      "Network Administration",
    ],
    createdDate: "2019-09-01",
    lastUpdated: "2023-12-20",
  },
  {
    id: "4",
    name: "Cybersecurity",
    code: "CYB",
    description: "Cutting-edge program in information security, ethical hacking, and digital forensics",
    duration: "3 years",
    credits: 180,
    level: "Bachelor",
    department: "Engineering",
    status: "Active",
    enrolledStudents: 134,
    maxCapacity: 180,
    prerequisites: ["Mathematics", "Computer Fundamentals"],
    courses: ["Information Security", "Ethical Hacking", "Digital Forensics", "Cryptography", "Security Management"],
    createdDate: "2022-09-01",
    lastUpdated: "2024-01-05",
  },
  {
    id: "5",
    name: "Artificial Intelligence",
    code: "AI",
    description: "New program focusing on AI, machine learning, and intelligent systems",
    duration: "3 years",
    credits: 180,
    level: "Bachelor",
    department: "Engineering",
    status: "Planning",
    enrolledStudents: 0,
    maxCapacity: 100,
    prerequisites: ["Mathematics", "Programming"],
    courses: ["AI Fundamentals", "Neural Networks", "Natural Language Processing", "Computer Vision", "Robotics"],
    createdDate: "2024-01-01",
    lastUpdated: "2024-01-20",
  },
]

type Program = { id: number; name: string; duration: string }

export function ProgramManagementDashboard() {
  const [programs, setPrograms] = useState<Program[]>([
    { id: 1, name: "Computer Science", duration: "3 years" },
    { id: 2, name: "Electrical Engineering", duration: "3 years" },
  ])
  const [form, setForm] = useState({ name: "", duration: "" })
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState<(typeof mockPrograms)[0] | null>(null)

  const filteredPrograms = mockPrograms.filter((program) => {
    const matchesSearch =
      program.name.toLowerCase().includes(search.toLowerCase()) ||
      program.code.toLowerCase().includes(search.toLowerCase()) ||
      program.description.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || program.status.toLowerCase() === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800"
      case "planning":
        return "bg-yellow-100 text-yellow-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCapacityColor = (enrolled: number, max: number) => {
    const percentage = (enrolled / max) * 100
    if (percentage >= 90) return "text-red-600"
    if (percentage >= 75) return "text-yellow-600"
    return "text-green-600"
  }

  function handleAddProgram() {
    setPrograms((prev) => [...prev, { id: prev.length + 1, ...form }])
    setForm({ name: "", duration: "" })
  }

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Program Management</h2>
          <p className="text-muted-foreground">Manage academic programs and their details</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Program
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Program</DialogTitle>
              <DialogDescription>Add a new academic program to the system</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="programName">Program Name</Label>
                  <Input id="programName" placeholder="e.g., Computer Science" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="programCode">Program Code</Label>
                  <Input id="programCode" placeholder="e.g., CS" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Program description..." />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2 years">2 years</SelectItem>
                      <SelectItem value="3 years">3 years</SelectItem>
                      <SelectItem value="4 years">4 years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="credits">Total Credits</Label>
                  <Input id="credits" type="number" placeholder="180" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacity">Max Capacity</Label>
                  <Input id="capacity" type="number" placeholder="200" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="level">Level</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bachelor">Bachelor</SelectItem>
                      <SelectItem value="Master">Master</SelectItem>
                      <SelectItem value="Diploma">Diploma</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="Sciences">Sciences</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="prerequisites">Prerequisites</Label>
                <Input id="prerequisites" placeholder="Mathematics, Physics (comma separated)" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="courses">Core Courses</Label>
                <Textarea id="courses" placeholder="List core courses (one per line)" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsCreateDialogOpen(false)}>Create Program</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Programs</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockPrograms.length}</div>
            <p className="text-xs text-muted-foreground">
              {mockPrograms.filter((p) => p.status === "Active").length} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockPrograms.reduce((sum, p) => sum + p.enrolledStudents, 0)}</div>
            <p className="text-xs text-muted-foreground">Across all programs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Capacity</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                (mockPrograms.reduce((sum, p) => sum + p.enrolledStudents, 0) /
                  mockPrograms.reduce((sum, p) => sum + p.maxCapacity, 0)) *
                  100,
              )}
              %
            </div>
            <p className="text-xs text-muted-foreground">Utilization rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Programs</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockPrograms.filter((p) => p.status === "Planning").length}</div>
            <p className="text-xs text-muted-foreground">In planning phase</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search programs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="planning">Planning</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Programs List */}
      <Card>
        <CardHeader>
          <CardTitle>Programs ({filteredPrograms.length})</CardTitle>
          <CardDescription>Manage academic programs and their configurations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPrograms.map((program) => (
              <div key={program.id} className="border rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{program.name}</h3>
                      <Badge variant="outline">{program.code}</Badge>
                      <Badge className={getStatusColor(program.status)}>{program.status}</Badge>
                    </div>
                    <p className="text-gray-600 mb-3">{program.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Duration:</span> {program.duration}
                      </div>
                      <div>
                        <span className="font-medium">Credits:</span> {program.credits}
                      </div>
                      <div>
                        <span className="font-medium">Level:</span> {program.level}
                      </div>
                      <div>
                        <span className="font-medium">Department:</span> {program.department}
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center gap-4 text-sm">
                        <div
                          className={`font-medium ${getCapacityColor(program.enrolledStudents, program.maxCapacity)}`}
                        >
                          Enrollment: {program.enrolledStudents}/{program.maxCapacity}
                        </div>
                        <div className="text-gray-600">Prerequisites: {program.prerequisites.join(", ")}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Dialog
                      open={isEditDialogOpen && selectedProgram?.id === program.id}
                      onOpenChange={setIsEditDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedProgram(program)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Edit Program</DialogTitle>
                          <DialogDescription>Update program information and settings</DialogDescription>
                        </DialogHeader>
                        {selectedProgram && (
                          <div className="space-y-4 max-h-96 overflow-y-auto">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="editName">Program Name</Label>
                                <Input id="editName" defaultValue={selectedProgram.name} />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="editCode">Program Code</Label>
                                <Input id="editCode" defaultValue={selectedProgram.code} />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="editDescription">Description</Label>
                              <Textarea id="editDescription" defaultValue={selectedProgram.description} />
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="editDuration">Duration</Label>
                                <Select defaultValue={selectedProgram.duration}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="2 years">2 years</SelectItem>
                                    <SelectItem value="3 years">3 years</SelectItem>
                                    <SelectItem value="4 years">4 years</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="editCredits">Total Credits</Label>
                                <Input id="editCredits" type="number" defaultValue={selectedProgram.credits} />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="editCapacity">Max Capacity</Label>
                                <Input id="editCapacity" type="number" defaultValue={selectedProgram.maxCapacity} />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="editStatus">Status</Label>
                              <Select defaultValue={selectedProgram.status}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Active">Active</SelectItem>
                                  <SelectItem value="Planning">Planning</SelectItem>
                                  <SelectItem value="Inactive">Inactive</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                                Cancel
                              </Button>
                              <Button onClick={() => setIsEditDialogOpen(false)}>Save Changes</Button>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
