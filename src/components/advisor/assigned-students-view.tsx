"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { Progress } from "@/components/ui/progress"
import { Search, Eye, MessageCircle, Calendar, GraduationCap, User } from "lucide-react"
import { Users } from "lucide-react" // Declared Users variable

// Mock data for assigned students
const assignedStudents = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@iut-douala.cm",
    schoolId: "IUT2024001",
    speciality: "Computer Science",
    academicBackground: "Baccalaureate S",
    profileComplete: true,
    orientationComplete: true,
    lastActivity: "2024-01-15",
    gpa: 3.7,
    semester: "Semester 3",
    avatar: "/placeholder.svg?height=40&width=40",
    progress: {
      coursesCompleted: 12,
      totalCourses: 16,
      attendanceRate: 95,
    },
    recentActivity: [
      "Completed Data Structures assignment",
      "Attended career counseling session",
      "Submitted project proposal",
    ],
  },
  {
    id: "2",
    name: "Marie Kouam",
    email: "marie.kouam@iut-douala.cm",
    schoolId: "IUT2024002",
    speciality: "Data Science",
    academicBackground: "Baccalaureate C",
    profileComplete: true,
    orientationComplete: false,
    lastActivity: "2024-01-14",
    gpa: 3.9,
    semester: "Semester 2",
    avatar: "/placeholder.svg?height=40&width=40",
    progress: {
      coursesCompleted: 8,
      totalCourses: 12,
      attendanceRate: 88,
    },
    recentActivity: [
      "Started Machine Learning course",
      "Requested meeting for career guidance",
      "Completed Python programming module",
    ],
  },
  {
    id: "3",
    name: "Alex Johnson",
    email: "alex.johnson@iut-douala.cm",
    schoolId: "IUT2024003",
    speciality: "Computer Science",
    academicBackground: "High School Diploma",
    profileComplete: false,
    orientationComplete: false,
    lastActivity: "2024-01-12",
    gpa: 3.2,
    semester: "Semester 1",
    avatar: "/placeholder.svg?height=40&width=40",
    progress: {
      coursesCompleted: 4,
      totalCourses: 8,
      attendanceRate: 92,
    },
    recentActivity: ["Needs to complete profile", "Missing orientation session", "Good performance in Mathematics"],
  },
]

export function AssignedStudentsView() {
  const [search, setSearch] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<(typeof assignedStudents)[0] | null>(null)
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false)

  const filteredStudents = assignedStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.schoolId.toLowerCase().includes(search.toLowerCase()) ||
      student.speciality.toLowerCase().includes(search.toLowerCase()),
  )

  const getStatusColor = (complete: boolean) => {
    return complete ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
  }

  const getGpaColor = (gpa: number) => {
    if (gpa >= 3.5) return "text-green-600"
    if (gpa >= 3.0) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignedStudents.length}</div>
            <p className="text-xs text-muted-foreground">Assigned to you</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile Complete</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignedStudents.filter((s) => s.profileComplete).length}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((assignedStudents.filter((s) => s.profileComplete).length / assignedStudents.length) * 100)}%
              completion rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orientation Done</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignedStudents.filter((s) => s.orientationComplete).length}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round(
                (assignedStudents.filter((s) => s.orientationComplete).length / assignedStudents.length) * 100,
              )}
              % completion rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average GPA</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(assignedStudents.reduce((sum, s) => sum + s.gpa, 0) / assignedStudents.length).toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">Across all students</p>
          </CardContent>
        </Card>
      </div>

      {/* Students List */}
      <Card>
        <CardHeader>
          <CardTitle>My Students</CardTitle>
          <CardDescription>Students assigned to your guidance</CardDescription>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search students..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredStudents.map((student) => (
              <div key={student.id} className="p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                      <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{student.name}</h3>
                        <Badge className={getStatusColor(student.profileComplete)}>
                          {student.profileComplete ? "Profile Complete" : "Profile Incomplete"}
                        </Badge>
                        <Badge className={getStatusColor(student.orientationComplete)}>
                          {student.orientationComplete ? "Orientation Done" : "Orientation Pending"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{student.email}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                        <span>ID: {student.schoolId}</span>
                        <span>{student.speciality}</span>
                        <span>{student.semester}</span>
                        <span className={`font-medium ${getGpaColor(student.gpa)}`}>GPA: {student.gpa}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Chat
                    </Button>
                    <Button variant="outline" size="sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      Schedule
                    </Button>
                    <Dialog
                      open={isProfileDialogOpen && selectedStudent?.id === student.id}
                      onOpenChange={setIsProfileDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedStudent(student)}>
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Student Profile: {student.name}</DialogTitle>
                          <DialogDescription>Detailed view of student information and progress</DialogDescription>
                        </DialogHeader>
                        {selectedStudent && (
                          <div className="space-y-6">
                            {/* Basic Info */}
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-semibold mb-2">Basic Information</h4>
                                <div className="space-y-1 text-sm">
                                  <p>
                                    <strong>School ID:</strong> {selectedStudent.schoolId}
                                  </p>
                                  <p>
                                    <strong>Email:</strong> {selectedStudent.email}
                                  </p>
                                  <p>
                                    <strong>Speciality:</strong> {selectedStudent.speciality}
                                  </p>
                                  <p>
                                    <strong>Background:</strong> {selectedStudent.academicBackground}
                                  </p>
                                  <p>
                                    <strong>Semester:</strong> {selectedStudent.semester}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">Academic Progress</h4>
                                <div className="space-y-3">
                                  <div>
                                    <div className="flex justify-between text-sm mb-1">
                                      <span>Courses Completed</span>
                                      <span>
                                        {selectedStudent.progress.coursesCompleted}/
                                        {selectedStudent.progress.totalCourses}
                                      </span>
                                    </div>
                                    <Progress
                                      value={
                                        (selectedStudent.progress.coursesCompleted /
                                          selectedStudent.progress.totalCourses) *
                                        100
                                      }
                                    />
                                  </div>
                                  <div>
                                    <div className="flex justify-between text-sm mb-1">
                                      <span>Attendance Rate</span>
                                      <span>{selectedStudent.progress.attendanceRate}%</span>
                                    </div>
                                    <Progress value={selectedStudent.progress.attendanceRate} />
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span>Current GPA</span>
                                    <span className={`font-medium ${getGpaColor(selectedStudent.gpa)}`}>
                                      {selectedStudent.gpa}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Recent Activity */}
                            <div>
                              <h4 className="font-semibold mb-2">Recent Activity</h4>
                              <div className="space-y-2">
                                {selectedStudent.recentActivity.map((activity, index) => (
                                  <div key={index} className="flex items-center gap-2 text-sm">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                                    <span>{activity}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-2 pt-4 border-t">
                              <Button variant="outline">
                                <MessageCircle className="w-4 h-4 mr-2" />
                                Send Message
                              </Button>
                              <Button variant="outline">
                                <Calendar className="w-4 h-4 mr-2" />
                                Schedule Meeting
                              </Button>
                              <Button onClick={() => setIsProfileDialogOpen(false)}>Close</Button>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                {/* Quick Progress Overview */}
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Course Progress</span>
                    <div className="flex items-center gap-2 mt-1">
                      <Progress
                        value={(student.progress.coursesCompleted / student.progress.totalCourses) * 100}
                        className="h-2"
                      />
                      <span className="text-xs">
                        {Math.round((student.progress.coursesCompleted / student.progress.totalCourses) * 100)}%
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Attendance</span>
                    <div className="flex items-center gap-2 mt-1">
                      <Progress value={student.progress.attendanceRate} className="h-2" />
                      <span className="text-xs">{student.progress.attendanceRate}%</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Last Activity</span>
                    <p className="text-xs mt-1">{student.lastActivity}</p>
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
