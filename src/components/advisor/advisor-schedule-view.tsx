"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, User, MapPin, ChevronLeft, ChevronRight, Video, Phone, MessageSquare } from "lucide-react"

// Mock data for scheduled appointments
const weeklySchedule = [
  {
    id: "1",
    date: "2024-01-15",
    time: "09:00",
    duration: "60 minutes",
    studentName: "John Doe",
    studentAvatar: "/placeholder.svg?height=40&width=40",
    topic: "Career Guidance Discussion",
    type: "in-person",
    location: "Office 204",
    status: "confirmed",
    meetingLink: null,
  },
  {
    id: "2",
    date: "2024-01-15",
    time: "14:00",
    duration: "45 minutes",
    studentName: "Marie Kouam",
    studentAvatar: "/placeholder.svg?height=40&width=40",
    topic: "Academic Performance Review",
    type: "virtual",
    location: "Online",
    status: "confirmed",
    meetingLink: "https://meet.iut-douala.cm/room/abc123",
  },
  {
    id: "3",
    date: "2024-01-16",
    time: "10:30",
    duration: "30 minutes",
    studentName: "Alex Johnson",
    studentAvatar: "/placeholder.svg?height=40&width=40",
    topic: "Course Selection Help",
    type: "in-person",
    location: "Office 204",
    status: "pending",
    meetingLink: null,
  },
  {
    id: "4",
    date: "2024-01-17",
    time: "15:00",
    duration: "60 minutes",
    studentName: "Sarah Wilson",
    studentAvatar: "/placeholder.svg?height=40&width=40",
    topic: "Internship Preparation",
    type: "virtual",
    location: "Online",
    status: "confirmed",
    meetingLink: "https://meet.iut-douala.cm/room/def456",
  },
]

const monthlyStats = {
  totalMeetings: 24,
  completedMeetings: 18,
  upcomingMeetings: 6,
  cancelledMeetings: 2,
  averageDuration: "45 minutes",
  mostCommonTopic: "Career Guidance",
}

export function AdvisorScheduleView() {
  const [currentWeek, setCurrentWeek] = useState(new Date())
  const [viewMode, setViewMode] = useState<"week" | "month">("week")

  const getWeekDates = (date: Date) => {
    const week = []
    const startDate = new Date(date)
    const day = startDate.getDay()
    const diff = startDate.getDate() - day + (day === 0 ? -6 : 1) // Adjust when day is Sunday
    startDate.setDate(diff)

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startDate)
      currentDate.setDate(startDate.getDate() + i)
      week.push(currentDate)
    }
    return week
  }

  const weekDates = getWeekDates(currentWeek)

  const getAppointmentsForDate = (date: Date) => {
    const dateString = date.toISOString().split("T")[0]
    return weeklySchedule.filter((appointment) => appointment.date === dateString)
  }

  const navigateWeek = (direction: "prev" | "next") => {
    const newDate = new Date(currentWeek)
    newDate.setDate(currentWeek.getDate() + (direction === "next" ? 7 : -7))
    setCurrentWeek(newDate)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    return type === "virtual" ? Video : MapPin
  }

  return (
    <div className="space-y-6">
      {/* Schedule Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Schedule</h2>
          <p className="text-gray-600">Manage your appointments and view your calendar</p>
        </div>
        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "week" | "month")}>
          <TabsList>
            <TabsTrigger value="week">Week View</TabsTrigger>
            <TabsTrigger value="month">Month Stats</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {viewMode === "week" ? (
        <>
          {/* Week Navigation */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm" onClick={() => navigateWeek("prev")}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <div className="text-center">
                    <h3 className="font-semibold">
                      {weekDates[0].toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {weekDates[0].toLocaleDateString()} - {weekDates[6].toLocaleDateString()}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => navigateWeek("next")}>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
                <Button onClick={() => setCurrentWeek(new Date())}>Today</Button>
              </div>
            </CardHeader>
          </Card>

          {/* Weekly Calendar Grid */}
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {weekDates.map((date, index) => {
              const appointments = getAppointmentsForDate(date)
              const isToday = date.toDateString() === new Date().toDateString()

              return (
                <Card key={index} className={`${isToday ? "ring-2 ring-blue-500" : ""}`}>
                  <CardHeader className="pb-2">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-600">
                        {date.toLocaleDateString("en-US", { weekday: "short" })}
                      </p>
                      <p className={`text-lg font-bold ${isToday ? "text-blue-600" : "text-gray-900"}`}>
                        {date.getDate()}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      {appointments.map((appointment) => {
                        const TypeIcon = getTypeIcon(appointment.type)
                        return (
                          <div
                            key={appointment.id}
                            className="p-2 rounded-lg border bg-white hover:shadow-sm transition-shadow cursor-pointer"
                          >
                            <div className="flex items-start gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage
                                  src={appointment.studentAvatar || "/placeholder.svg"}
                                  alt={appointment.studentName}
                                />
                                <AvatarFallback className="text-xs">{appointment.studentName.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium truncate">{appointment.studentName}</p>
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                  <Clock className="w-3 h-3" />
                                  {appointment.time}
                                </div>
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                  <TypeIcon className="w-3 h-3" />
                                  {appointment.location}
                                </div>
                                <Badge className={`${getStatusColor(appointment.status)} text-xs mt-1`}>
                                  {appointment.status}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                      {appointments.length === 0 && (
                        <p className="text-xs text-gray-400 text-center py-4">No appointments</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Today's Appointments Detail */}
          <Card>
            <CardHeader>
              <CardTitle>Today's Appointments</CardTitle>
              <CardDescription>Detailed view of your appointments for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getAppointmentsForDate(new Date()).map((appointment) => {
                  const TypeIcon = getTypeIcon(appointment.type)
                  return (
                    <div key={appointment.id} className="p-4 rounded-lg border">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage
                              src={appointment.studentAvatar || "/placeholder.svg"}
                              alt={appointment.studentName}
                            />
                            <AvatarFallback>{appointment.studentName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{appointment.studentName}</h3>
                            <p className="text-sm text-gray-600">{appointment.topic}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {appointment.time} ({appointment.duration})
                              </span>
                              <span className="flex items-center gap-1">
                                <TypeIcon className="w-4 h-4" />
                                {appointment.location}
                              </span>
                              <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {appointment.meetingLink && (
                            <Button size="sm" asChild>
                              <a href={appointment.meetingLink} target="_blank" rel="noopener noreferrer">
                                <Video className="w-4 h-4 mr-1" />
                                Join
                              </a>
                            </Button>
                          )}
                          <Button size="sm" variant="outline">
                            <Phone className="w-4 h-4 mr-1" />
                            Call
                          </Button>
                          <Button size="sm" variant="outline">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Message
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                })}
                {getAppointmentsForDate(new Date()).length === 0 && (
                  <div className="text-center py-8 text-gray-500">No appointments scheduled for today</div>
                )}
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        /* Monthly Statistics */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Meetings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{monthlyStats.totalMeetings}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{monthlyStats.completedMeetings}</div>
              <p className="text-xs text-muted-foreground">Successfully completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{monthlyStats.upcomingMeetings}</div>
              <p className="text-xs text-muted-foreground">Scheduled ahead</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Duration</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{monthlyStats.averageDuration}</div>
              <p className="text-xs text-muted-foreground">Per meeting</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Most Common Topic</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">{monthlyStats.mostCommonTopic}</div>
              <p className="text-xs text-muted-foreground">Discussion topic</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{monthlyStats.cancelledMeetings}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
