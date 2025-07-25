"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Activity, Users, FileText, Settings, AlertCircle, CheckCircle, Clock, Filter } from "lucide-react"

// Mock activity data
const mockActivities = [
  {
    id: "1",
    type: "user_login",
    user: "Marie Dubois",
    role: "ADVISOR",
    action: "Logged into the system",
    timestamp: "2024-01-20T14:30:00Z",
    details: "IP: 192.168.1.100, Browser: Chrome",
    status: "success",
    category: "authentication",
  },
  {
    id: "2",
    type: "student_registration",
    user: "Jean Kamga",
    role: "STUDENT",
    action: "Completed student registration",
    timestamp: "2024-01-20T14:25:00Z",
    details: "Program: Computer Science, Student ID: CS2024001",
    status: "success",
    category: "registration",
  },
  {
    id: "3",
    type: "advisor_assignment",
    user: "Admin User",
    role: "ADMIN",
    action: "Assigned advisor to student",
    timestamp: "2024-01-20T14:20:00Z",
    details: "Advisor: Dr. Marie Dubois, Student: Jean Kamga",
    status: "success",
    category: "assignment",
  },
  {
    id: "4",
    type: "meeting_request",
    user: "Sarah Nkomo",
    role: "STUDENT",
    action: "Requested meeting with advisor",
    timestamp: "2024-01-20T14:15:00Z",
    details: "Advisor: Prof. Jean-Claude Mbarga, Date: 2024-01-25",
    status: "pending",
    category: "meeting",
  },
  {
    id: "5",
    type: "profile_update",
    user: "Dr. Fatima Al-Hassan",
    role: "ADVISOR",
    action: "Updated profile information",
    timestamp: "2024-01-20T14:10:00Z",
    details: "Updated office hours and contact information",
    status: "success",
    category: "profile",
  },
  {
    id: "6",
    type: "system_error",
    user: "System",
    role: "SYSTEM",
    action: "Database connection timeout",
    timestamp: "2024-01-20T14:05:00Z",
    details: "Connection to primary database failed, switched to backup",
    status: "error",
    category: "system",
  },
  {
    id: "7",
    type: "document_upload",
    user: "Paul Nguema",
    role: "STUDENT",
    action: "Uploaded academic transcript",
    timestamp: "2024-01-20T14:00:00Z",
    details: "File: transcript_2023.pdf, Size: 2.3MB",
    status: "success",
    category: "document",
  },
  {
    id: "8",
    type: "grade_submission",
    user: "Dr. Sarah Johnson",
    role: "ADVISOR",
    action: "Submitted grades for CS301",
    timestamp: "2024-01-20T13:55:00Z",
    details: "Course: Advanced Programming, Students: 25",
    status: "success",
    category: "academic",
  },
  {
    id: "9",
    type: "user_logout",
    user: "Marie Dubois",
    role: "ADVISOR",
    action: "Logged out of the system",
    timestamp: "2024-01-20T13:50:00Z",
    details: "Session duration: 2h 15m",
    status: "success",
    category: "authentication",
  },
  {
    id: "10",
    type: "failed_login",
    user: "Unknown",
    role: "UNKNOWN",
    action: "Failed login attempt",
    timestamp: "2024-01-20T13:45:00Z",
    details: "IP: 192.168.1.200, Reason: Invalid credentials",
    status: "error",
    category: "security",
  },
]

export function ActivityMonitoringDashboard() {
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")
  const [timeFilter, setTimeFilter] = useState("today")

  const filteredActivities = mockActivities.filter((activity) => {
    const matchesSearch =
      activity.user.toLowerCase().includes(search.toLowerCase()) ||
      activity.action.toLowerCase().includes(search.toLowerCase()) ||
      activity.details.toLowerCase().includes(search.toLowerCase())
    const matchesType = typeFilter === "all" || activity.category === typeFilter
    const matchesStatus = statusFilter === "all" || activity.status === statusFilter
    const matchesRole = roleFilter === "all" || activity.role === roleFilter
    return matchesSearch && matchesType && matchesStatus && matchesRole
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />
      default:
        return <Activity className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800"
      case "error":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-purple-100 text-purple-800"
      case "ADVISOR":
        return "bg-blue-100 text-blue-800"
      case "STUDENT":
        return "bg-green-100 text-green-800"
      case "SYSTEM":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-red-100 text-red-800"
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString()
  }

  const getActivityStats = () => {
    const total = mockActivities.length
    const success = mockActivities.filter((a) => a.status === "success").length
    const errors = mockActivities.filter((a) => a.status === "error").length
    const pending = mockActivities.filter((a) => a.status === "pending").length
    return { total, success, errors, pending }
  }

  const stats = getActivityStats()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Activity Monitoring</h2>
        <p className="text-muted-foreground">Monitor system activities and user actions in real-time</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Activities</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Successful</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.success}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((stats.success / stats.total) * 100)}% success rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Errors</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.errors}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">Awaiting action</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Activity Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search activities..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="authentication">Authentication</SelectItem>
                <SelectItem value="registration">Registration</SelectItem>
                <SelectItem value="assignment">Assignment</SelectItem>
                <SelectItem value="meeting">Meeting</SelectItem>
                <SelectItem value="profile">Profile</SelectItem>
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="document">Document</SelectItem>
                <SelectItem value="academic">Academic</SelectItem>
                <SelectItem value="security">Security</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="ADVISOR">Advisor</SelectItem>
                <SelectItem value="STUDENT">Student</SelectItem>
                <SelectItem value="SYSTEM">System</SelectItem>
              </SelectContent>
            </Select>
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Feed ({filteredActivities.length})</CardTitle>
          <CardDescription>Real-time system activity and user actions</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            <div className="space-y-4">
              {filteredActivities.map((activity) => (
                <div key={activity.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="mt-1">{getStatusIcon(activity.status)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{activity.user}</span>
                          <Badge className={getRoleColor(activity.role)} variant="secondary">
                            {activity.role}
                          </Badge>
                          <Badge className={getStatusColor(activity.status)} variant="secondary">
                            {activity.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-900 mb-1">{activity.action}</p>
                        <p className="text-xs text-gray-600 mb-2">{activity.details}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>{formatTimestamp(activity.timestamp)}</span>
                          <span className="capitalize">{activity.category}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common monitoring and management tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
              <FileText className="w-6 h-6" />
              <span>Export Activity Log</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
              <Settings className="w-6 h-6" />
              <span>Configure Alerts</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
              <Users className="w-6 h-6" />
              <span>View User Sessions</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
