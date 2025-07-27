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
import { Search, Plus, Edit, UserCheck, Users, Clock, Award, Mail, Phone, MapPin } from "lucide-react"

// Mock advisors data
const mockAdvisors = [
  {
    id: "1",
    name: "Dr. Marie Dubois",
    email: "marie.dubois@iut-douala.cm",
    phone: "+237 6XX XXX XXX",
    office: "Building A, Room 205",
    department: "Computer Science",
    specialties: ["Software Engineering", "Database Systems", "Web Development"],
    qualifications: ["PhD Computer Science", "MSc Software Engineering"],
    bio: "Dr. Dubois has over 10 years of experience in software development and database design. She specializes in modern web technologies and agile development methodologies.",
    status: "Active",
    assignedStudents: 15,
    maxCapacity: 20,
    joinDate: "2019-09-01",
    officeHours: "Monday-Friday 2:00-4:00 PM",
    languages: ["French", "English"],
    researchInterests: ["Machine Learning", "Data Analytics", "Software Architecture"],
  },
  {
    id: "2",
    name: "Prof. Jean-Claude Mbarga",
    email: "jc.mbarga@iut-douala.cm",
    phone: "+237 6XX XXX XXX",
    office: "Building B, Room 301",
    department: "Electrical Engineering",
    specialties: ["Power Systems", "Control Systems", "Renewable Energy"],
    qualifications: ["PhD Electrical Engineering", "MSc Power Systems"],
    bio: "Professor Mbarga is a leading expert in power systems and renewable energy. He has published over 50 research papers and leads several international projects.",
    status: "Active",
    assignedStudents: 18,
    maxCapacity: 25,
    joinDate: "2015-09-01",
    officeHours: "Tuesday-Thursday 10:00-12:00 PM",
    languages: ["French", "English"],
    researchInterests: ["Smart Grids", "Solar Energy", "Energy Storage"],
  },
  {
    id: "3",
    name: "Dr. Fatima Al-Hassan",
    email: "fatima.hassan@iut-douala.cm",
    phone: "+237 6XX XXX XXX",
    office: "Building C, Room 102",
    department: "Data Science",
    specialties: ["Machine Learning", "Data Mining", "Statistical Analysis"],
    qualifications: ["PhD Data Science", "MSc Statistics"],
    bio: "Dr. Al-Hassan specializes in machine learning applications and big data analytics. She has extensive experience in predictive modeling and data visualization.",
    status: "Active",
    assignedStudents: 12,
    maxCapacity: 18,
    joinDate: "2020-09-01",
    officeHours: "Monday-Wednesday 1:00-3:00 PM",
    languages: ["French", "English", "Arabic"],
    researchInterests: ["Deep Learning", "Natural Language Processing", "Computer Vision"],
  },
  {
    id: "4",
    name: "Dr. Paul Nguema",
    email: "paul.nguema@iut-douala.cm",
    phone: "+237 6XX XXX XXX",
    office: "Building A, Room 310",
    department: "Network Engineering",
    specialties: ["Network Security", "Wireless Networks", "Network Administration"],
    qualifications: ["PhD Network Engineering", "MSc Cybersecurity"],
    bio: "Dr. Nguema is an expert in network security and wireless communications. He has worked with major telecommunications companies and government agencies.",
    status: "On Leave",
    assignedStudents: 8,
    maxCapacity: 15,
    joinDate: "2018-09-01",
    officeHours: "Currently unavailable",
    languages: ["French", "English"],
    researchInterests: ["5G Networks", "IoT Security", "Network Protocols"],
  },
  {
    id: "5",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@iut-douala.cm",
    phone: "+237 6XX XXX XXX",
    office: "Building D, Room 201",
    department: "Cybersecurity",
    specialties: ["Ethical Hacking", "Digital Forensics", "Information Security"],
    qualifications: ["PhD Cybersecurity", "MSc Information Security", "CISSP Certified"],
    bio: "Dr. Johnson is a certified cybersecurity expert with extensive experience in penetration testing and digital forensics. She regularly consults for government and private organizations.",
    status: "Active",
    assignedStudents: 14,
    maxCapacity: 20,
    joinDate: "2021-09-01",
    officeHours: "Monday-Friday 9:00-11:00 AM",
    languages: ["English", "French"],
    researchInterests: ["Blockchain Security", "AI in Cybersecurity", "Privacy Protection"],
  },
]

export function AdvisorManagementDashboard() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedAdvisor, setSelectedAdvisor] = useState<(typeof mockAdvisors)[0] | null>(null)

  const filteredAdvisors = mockAdvisors.filter((advisor) => {
    const matchesSearch =
      advisor.name.toLowerCase().includes(search.toLowerCase()) ||
      advisor.email.toLowerCase().includes(search.toLowerCase()) ||
      advisor.department.toLowerCase().includes(search.toLowerCase()) ||
      advisor.specialties.some((s) => s.toLowerCase().includes(search.toLowerCase()))
    const matchesStatus = statusFilter === "all" || advisor.status.toLowerCase() === statusFilter
    const matchesDepartment = departmentFilter === "all" || advisor.department === departmentFilter
    return matchesSearch && matchesStatus && matchesDepartment
  })

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800"
      case "on leave":
        return "bg-yellow-100 text-yellow-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCapacityColor = (assigned: number, max: number) => {
    const percentage = (assigned / max) * 100
    if (percentage >= 90) return "text-red-600"
    if (percentage >= 75) return "text-yellow-600"
    return "text-green-600"
  }

  const departments = [...new Set(mockAdvisors.map((a) => a.department))]

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Advisor Management</h2>
          <p className="text-muted-foreground">Manage academic advisors and their assignments</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Advisor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Add New Advisor</DialogTitle>
              <DialogDescription>Create a new advisor profile</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="advisorName">Full Name</Label>
                  <Input id="advisorName" placeholder="Dr. John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="advisorEmail">Email</Label>
                  <Input id="advisorEmail" type="email" placeholder="john.doe@iut-douala.cm" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="advisorPhone">Phone</Label>
                  <Input id="advisorPhone" placeholder="+237 6XX XXX XXX" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="advisorOffice">Office Location</Label>
                  <Input id="advisorOffice" placeholder="Building A, Room 205" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="advisorDepartment">Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                      <SelectItem value="Electrical Engineering">Electrical Engineering</SelectItem>
                      <SelectItem value="Data Science">Data Science</SelectItem>
                      <SelectItem value="Network Engineering">Network Engineering</SelectItem>
                      <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="advisorCapacity">Max Student Capacity</Label>
                  <Input id="advisorCapacity" type="number" placeholder="20" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="advisorSpecialties">Specialties</Label>
                <Input id="advisorSpecialties" placeholder="Software Engineering, Database Systems (comma separated)" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="advisorQualifications">Qualifications</Label>
                <Input id="advisorQualifications" placeholder="PhD Computer Science, MSc Software Engineering" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="advisorBio">Biography</Label>
                <Textarea id="advisorBio" placeholder="Brief professional biography..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="advisorOfficeHours">Office Hours</Label>
                <Input id="advisorOfficeHours" placeholder="Monday-Friday 2:00-4:00 PM" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsCreateDialogOpen(false)}>Create Advisor</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Advisors</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAdvisors.length}</div>
            <p className="text-xs text-muted-foreground">
              {mockAdvisors.filter((a) => a.status === "Active").length} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students Advised</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAdvisors.reduce((sum, a) => sum + a.assignedStudents, 0)}</div>
            <p className="text-xs text-muted-foreground">Total assignments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Load</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                (mockAdvisors.reduce((sum, a) => sum + a.assignedStudents, 0) /
                  mockAdvisors.reduce((sum, a) => sum + a.maxCapacity, 0)) *
                  100,
              )}
              %
            </div>
            <p className="text-xs text-muted-foreground">Capacity utilization</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Leave</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAdvisors.filter((a) => a.status === "On Leave").length}</div>
            <p className="text-xs text-muted-foreground">Currently unavailable</p>
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
                placeholder="Search advisors..."
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
                <SelectItem value="on leave">On Leave</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Advisors List */}
      <Card>
        <CardHeader>
          <CardTitle>Advisors ({filteredAdvisors.length})</CardTitle>
          <CardDescription>Manage advisor profiles and assignments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAdvisors.map((advisor) => (
              <div key={advisor.id} className="border rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{advisor.name}</h3>
                      <Badge className={getStatusColor(advisor.status)}>{advisor.status}</Badge>
                      <Badge variant="outline">{advisor.department}</Badge>
                    </div>
                    <p className="text-gray-600 mb-3">{advisor.bio}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-4 h-4 text-gray-500" />
                          <span>{advisor.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <span>{advisor.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span>{advisor.office}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="font-medium">Office Hours:</span> {advisor.officeHours}
                        </div>
                        <div
                          className={`text-sm font-medium ${getCapacityColor(advisor.assignedStudents, advisor.maxCapacity)}`}
                        >
                          Students: {advisor.assignedStudents}/{advisor.maxCapacity}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Languages:</span> {advisor.languages.join(", ")}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <span className="font-medium text-sm">Specialties:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {advisor.specialties.map((specialty, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium text-sm">Qualifications:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {advisor.qualifications.map((qual, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {qual}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Dialog
                      open={isEditDialogOpen && selectedAdvisor?.id === advisor.id}
                      onOpenChange={setIsEditDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedAdvisor(advisor)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>Edit Advisor</DialogTitle>
                          <DialogDescription>Update advisor information and settings</DialogDescription>
                        </DialogHeader>
                        {selectedAdvisor && (
                          <div className="space-y-4 max-h-96 overflow-y-auto">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="editName">Full Name</Label>
                                <Input id="editName" defaultValue={selectedAdvisor.name} />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="editEmail">Email</Label>
                                <Input id="editEmail" defaultValue={selectedAdvisor.email} />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="editPhone">Phone</Label>
                                <Input id="editPhone" defaultValue={selectedAdvisor.phone} />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="editOffice">Office Location</Label>
                                <Input id="editOffice" defaultValue={selectedAdvisor.office} />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="editBio">Biography</Label>
                              <Textarea id="editBio" defaultValue={selectedAdvisor.bio} />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="editStatus">Status</Label>
                              <Select defaultValue={selectedAdvisor.status}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Active">Active</SelectItem>
                                  <SelectItem value="On Leave">On Leave</SelectItem>
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
