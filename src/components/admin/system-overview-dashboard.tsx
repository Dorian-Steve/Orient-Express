"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Users, GraduationCap, Calendar, MessageSquare, TrendingUp, UserCheck } from "lucide-react"

const systemStats = {
  totalUsers: 1247,
  totalStudents: 1089,
  totalAdvisors: 23,
  totalAdmins: 5,
  activeUsers: 892,
  completedProfiles: 756,
  pendingMeetings: 34,
  totalMeetings: 156,
  messagesExchanged: 2341,
  orientationCompleted: 623,
}

const recentActivity = [
  { id: 1, type: "registration", user: "Marie Kouam", action: "New student registered", time: "2 hours ago" },
  { id: 2, type: "meeting", user: "Dr. Jean Mbarga", action: "Meeting approved with John Doe", time: "4 hours ago" },
  { id: 3, type: "assignment", user: "Admin", action: "Advisor assigned to 5 new students", time: "6 hours ago" },
  { id: 4, type: "profile", user: "Sarah Chen", action: "Profile completed", time: "8 hours ago" },
  { id: 5, type: "orientation", user: "Alex Johnson", action: "Orientation completed", time: "1 day ago" },
]

export function SystemOverviewDashboard() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.activeUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8%</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Meetings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.pendingMeetings}</div>
            <p className="text-xs text-muted-foreground">Awaiting advisor approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages Today</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+23%</span> from yesterday
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
            <CardDescription>Breakdown of users by role</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Students</span>
                <span className="text-sm text-muted-foreground">{systemStats.totalStudents}</span>
              </div>
              <Progress value={(systemStats.totalStudents / systemStats.totalUsers) * 100} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Advisors</span>
                <span className="text-sm text-muted-foreground">{systemStats.totalAdvisors}</span>
              </div>
              <Progress value={(systemStats.totalAdvisors / systemStats.totalUsers) * 100} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Admins</span>
                <span className="text-sm text-muted-foreground">{systemStats.totalAdmins}</span>
              </div>
              <Progress value={(systemStats.totalAdmins / systemStats.totalUsers) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Platform Engagement</CardTitle>
            <CardDescription>Key engagement metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">Profile Completion</span>
              </div>
              <Badge variant="secondary">
                {Math.round((systemStats.completedProfiles / systemStats.totalStudents) * 100)}%
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">Orientation Completed</span>
              </div>
              <Badge variant="secondary">
                {Math.round((systemStats.orientationCompleted / systemStats.totalStudents) * 100)}%
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium">Total Meetings</span>
              </div>
              <Badge variant="secondary">{systemStats.totalMeetings}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-medium">Messages Exchanged</span>
              </div>
              <Badge variant="secondary">{systemStats.messagesExchanged.toLocaleString()}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest system activities and user actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activity.type === "registration"
                        ? "bg-green-500"
                        : activity.type === "meeting"
                          ? "bg-blue-500"
                          : activity.type === "assignment"
                            ? "bg-purple-500"
                            : activity.type === "profile"
                              ? "bg-orange-500"
                              : "bg-gray-500"
                    }`}
                  />
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">by {activity.user}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
