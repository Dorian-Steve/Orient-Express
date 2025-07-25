"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, UserPlus, Users, Filter } from "lucide-react"

// Mock data
const students = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@iut-douala.cm",
    schoolId: "IUT2024001",
    speciality: "Computer Science",
    advisor: null,
    profileComplete: true,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Marie Kouam",
    email: "marie.kouam@iut-douala.cm",
    schoolId: "IUT2024002",
    speciality: "Data Science",
    advisor: "Dr. Jean Mbarga",
    profileComplete: true,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Alex Johnson",
    email: "alex.johnson@iut-douala.cm",
    schoolId: "IUT2024003",
    speciality: "Network Engineering",
    advisor: null,
    profileComplete: false,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Sarah Chen",
    email: "sarah.chen@iut-douala.cm",
    schoolId: "IUT2024004",
    speciality: "Cybersecurity",
    advisor: "Prof. Alice Nkomo",
    profileComplete: true,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const advisors = [
  {
    id: "1",
    name: "Dr. Jean Mbarga",
    email: "j.mbarga@iut-douala.cm",
    specialities: ["Computer Science", "Data Science"],
    assignedStudents: 12,
    maxStudents: 20,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Prof. Alice Nkomo",
    email: "a.nkomo@iut-douala.cm",
    specialities: ["Cybersecurity", "Network Engineering"],
    assignedStudents: 8,
    maxStudents: 15,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Dr. Paul Essomba",
    email: "p.essomba@iut-douala.cm",
    specialities: ["Electrical Engineering", "Mechanical Engineering"],
    assignedStudents: 15,
    maxStudents: 18,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function AdvisorAssignmentDashboard() {
  const [studentSearch, setStudentSearch] = useState("")
  const [advisorSearch, setAdvisorSearch] = useState("")
  const [filterSpeciality, setFilterSpeciality] = useState("all")
  const [filterAssignment, setFilterAssignment] = useState("all")
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false)

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
      student.schoolId.toLowerCase().includes(studentSearch.toLowerCase())
    const matchesSpeciality = filterSpeciality === "all" || student.speciality === filterSpeciality
    const matchesAssignment =
      filterAssignment === "all" ||
      (filterAssignment === "assigned" && student.advisor) ||
      (filterAssignment === "unassigned" && !student.advisor)
    return matchesSearch && matchesSpeciality && matchesAssignment
  })

  const filteredAdvisors = advisors.filter(
    (advisor) =>
      advisor.name.toLowerCase().includes(advisorSearch.toLowerCase()) ||
      advisor.email.toLowerCase().includes(advisorSearch.toLowerCase()),
  )

  const handleAssignAdvisor = (studentId: string, advisorName: string) => {
    // In a real app, this would make an API call
    console.log(`Assigning ${advisorName} to student ${studentId}`)
    setIsAssignDialogOpen(false)
    setSelectedStudent(null)
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
            <p className="text-xs text-muted-foreground">{students.filter((s) => s.advisor).length} assigned</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Advisors</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{advisors.length}</div>
            <p className="text-xs text-muted-foreground">
              {advisors.reduce((sum, a) => sum + a.assignedStudents, 0)} total assignments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unassigned</CardTitle>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.filter((s) => !s.advisor).length}</div>
            <p className="text-xs text-muted-foreground">Students need advisors</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Students Section */}
        <Card>
          <CardHeader>
            <CardTitle>Students</CardTitle>
            <CardDescription>Manage student-advisor assignments</CardDescription>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select value={filterSpeciality} onValueChange={setFilterSpeciality}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by speciality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialities</SelectItem>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Data Science">Data Science</SelectItem>
                  <SelectItem value="Network Engineering">Network Engineering</SelectItem>
                  <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterAssignment} onValueChange={setFilterAssignment}>
                <SelectTrigger className="w-full sm:w-[140px]">
                  <SelectValue placeholder="Filter by assignment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Students</SelectItem>
                  <SelectItem value="assigned">Assigned</SelectItem>
                  <SelectItem value="unassigned">Unassigned</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredStudents.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                      <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">{student.schoolId}</p>
                      <p className="text-xs text-muted-foreground">{student.speciality}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {student.advisor ? (
                      <Badge variant="secondary">{student.advisor}</Badge>
                    ) : (
                      <Dialog
                        open={isAssignDialogOpen && selectedStudent === student.id}
                        onOpenChange={setIsAssignDialogOpen}
                      >
                        <DialogTrigger asChild>
                          <Button size="sm" onClick={() => setSelectedStudent(student.id)}>
                            Assign
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Assign Advisor</DialogTitle>
                            <DialogDescription>
                              Select an advisor for {student.name} ({student.speciality})
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            {advisors
                              .filter((advisor) => advisor.specialities.includes(student.speciality))
                              .map((advisor) => (
                                <div
                                  key={advisor.id}
                                  className="flex items-center justify-between p-3 rounded-lg border"
                                >
                                  <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage src={advisor.avatar || "/placeholder.svg"} alt={advisor.name} />
                                      <AvatarFallback>{advisor.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <p className="font-medium">{advisor.name}</p>
                                      <p className="text-sm text-muted-foreground">
                                        {advisor.assignedStudents}/{advisor.maxStudents} students
                                      </p>
                                    </div>
                                  </div>
                                  <Button
                                    size="sm"
                                    onClick={() => handleAssignAdvisor(student.id, advisor.name)}
                                    disabled={advisor.assignedStudents >= advisor.maxStudents}
                                  >
                                    Assign
                                  </Button>
                                </div>
                              ))}
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Advisors Section */}
        <Card>
          <CardHeader>
            <CardTitle>Advisors</CardTitle>
            <CardDescription>View advisor workload and specialities</CardDescription>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search advisors..."
                value={advisorSearch}
                onChange={(e) => setAdvisorSearch(e.target.value)}
                className="pl-8"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredAdvisors.map((advisor) => (
                <div key={advisor.id} className="p-4 rounded-lg border">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={advisor.avatar || "/placeholder.svg"} alt={advisor.name} />
                      <AvatarFallback>{advisor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{advisor.name}</p>
                      <p className="text-sm text-muted-foreground">{advisor.email}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Workload</span>
                      <span className="text-sm text-muted-foreground">
                        {advisor.assignedStudents}/{advisor.maxStudents}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          advisor.assignedStudents / advisor.maxStudents > 0.8
                            ? "bg-red-500"
                            : advisor.assignedStudents / advisor.maxStudents > 0.6
                              ? "bg-yellow-500"
                              : "bg-green-500"
                        }`}
                        style={{ width: `${(advisor.assignedStudents / advisor.maxStudents) * 100}%` }}
                      />
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {advisor.specialities.map((speciality) => (
                        <Badge key={speciality} variant="outline" className="text-xs">
                          {speciality}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
