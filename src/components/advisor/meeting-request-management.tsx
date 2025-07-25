"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, User, CheckCircle, XCircle, RotateCcw, MessageSquare } from "lucide-react"

// Mock data for meeting requests
const meetingRequests = [
  {
    id: "1",
    studentId: "1",
    studentName: "John Doe",
    studentAvatar: "/placeholder.svg?height=40&width=40",
    topic: "Career Guidance Discussion",
    description:
      "I would like to discuss my career options after graduation and get advice on internship opportunities.",
    proposedDate: "2024-01-20",
    proposedTime: "14:00",
    duration: "60 minutes",
    status: "pending",
    priority: "medium",
    submittedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    studentId: "2",
    studentName: "Marie Kouam",
    studentAvatar: "/placeholder.svg?height=40&width=40",
    topic: "Academic Performance Review",
    description:
      "I'm struggling with some courses and would like to discuss strategies to improve my grades and study habits.",
    proposedDate: "2024-01-18",
    proposedTime: "10:00",
    duration: "45 minutes",
    status: "pending",
    priority: "high",
    submittedAt: "2024-01-14T14:20:00Z",
  },
  {
    id: "3",
    studentId: "3",
    studentName: "Alex Johnson",
    studentAvatar: "/placeholder.svg?height=40&width=40",
    topic: "Course Selection Help",
    description: "Need guidance on selecting elective courses for next semester that align with my career goals.",
    proposedDate: "2024-01-22",
    proposedTime: "16:00",
    duration: "30 minutes",
    status: "approved",
    priority: "low",
    submittedAt: "2024-01-13T09:15:00Z",
    approvedDate: "2024-01-14",
    meetingLink: "https://meet.iut-douala.cm/room/abc123",
  },
]

const completedMeetings = [
  {
    id: "4",
    studentId: "1",
    studentName: "John Doe",
    studentAvatar: "/placeholder.svg?height=40&width=40",
    topic: "Orientation Discussion",
    date: "2024-01-10",
    time: "15:00",
    duration: "45 minutes",
    status: "completed",
    notes: "Discussed academic path and provided resources for career exploration.",
  },
  {
    id: "5",
    studentId: "2",
    studentName: "Marie Kouam",
    studentAvatar: "/placeholder.svg?height=40&width=40",
    topic: "Project Guidance",
    date: "2024-01-08",
    time: "11:00",
    duration: "60 minutes",
    status: "completed",
    notes: "Reviewed project proposal and provided feedback on methodology.",
  },
]

export function MeetingRequestManagement() {
  const [selectedRequest, setSelectedRequest] = useState<(typeof meetingRequests)[0] | null>(null)
  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false)
  const [actionType, setActionType] = useState<"approve" | "decline" | "reschedule" | null>(null)
  const [rescheduleDate, setRescheduleDate] = useState("")
  const [rescheduleTime, setRescheduleTime] = useState("")
  const [declineReason, setDeclineReason] = useState("")

  const pendingRequests = meetingRequests.filter((req) => req.status === "pending")
  const approvedRequests = meetingRequests.filter((req) => req.status === "approved")

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "declined":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleAction = (request: (typeof meetingRequests)[0], action: "approve" | "decline" | "reschedule") => {
    setSelectedRequest(request)
    setActionType(action)
    setIsActionDialogOpen(true)
  }

  const submitAction = () => {
    if (!selectedRequest || !actionType) return

    // In a real app, this would make an API call
    console.log(`${actionType} meeting request ${selectedRequest.id}`)

    if (actionType === "reschedule") {
      console.log(`New date: ${rescheduleDate}, New time: ${rescheduleTime}`)
    } else if (actionType === "decline") {
      console.log(`Decline reason: ${declineReason}`)
    }

    setIsActionDialogOpen(false)
    setSelectedRequest(null)
    setActionType(null)
    setRescheduleDate("")
    setRescheduleTime("")
    setDeclineReason("")
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingRequests.length}</div>
            <p className="text-xs text-muted-foreground">Awaiting your response</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedRequests.length}</div>
            <p className="text-xs text-muted-foreground">Scheduled meetings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Meetings scheduled</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedMeetings.length}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Meeting Requests Tabs */}
      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending Requests ({pendingRequests.length})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({approvedRequests.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedMeetings.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Meeting Requests</CardTitle>
              <CardDescription>Review and respond to student meeting requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingRequests.map((request) => (
                  <div key={request.id} className="p-4 rounded-lg border">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={request.studentAvatar || "/placeholder.svg"} alt={request.studentName} />
                          <AvatarFallback>{request.studentName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{request.studentName}</h3>
                            <Badge className={getPriorityColor(request.priority)}>{request.priority} priority</Badge>
                          </div>
                          <h4 className="font-medium text-sm mb-2">{request.topic}</h4>
                          <p className="text-sm text-muted-foreground mb-3">{request.description}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {request.proposedDate}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {request.proposedTime}
                            </span>
                            <span>{request.duration}</span>
                            <span>Requested {new Date(request.submittedAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleAction(request, "approve")}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleAction(request, "reschedule")}>
                        <RotateCcw className="w-4 h-4 mr-1" />
                        Reschedule
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAction(request, "decline")}
                        className="text-red-600 hover:text-red-700"
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Decline
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Message
                      </Button>
                    </div>
                  </div>
                ))}
                {pendingRequests.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">No pending meeting requests</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approved">
          <Card>
            <CardHeader>
              <CardTitle>Approved Meetings</CardTitle>
              <CardDescription>Upcoming scheduled meetings with students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {approvedRequests.map((request) => (
                  <div key={request.id} className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={request.studentAvatar || "/placeholder.svg"} alt={request.studentName} />
                          <AvatarFallback>{request.studentName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{request.studentName}</h3>
                            <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                          </div>
                          <p className="text-sm font-medium">{request.topic}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {request.proposedDate}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {request.proposedTime}
                            </span>
                            <span>{request.duration}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {request.meetingLink && (
                          <Button size="sm" asChild>
                            <a href={request.meetingLink} target="_blank" rel="noopener noreferrer">
                              Join Meeting
                            </a>
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Message
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                {approvedRequests.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">No approved meetings</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>Completed Meetings</CardTitle>
              <CardDescription>Past meetings and session notes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {completedMeetings.map((meeting) => (
                  <div key={meeting.id} className="p-4 rounded-lg border">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={meeting.studentAvatar || "/placeholder.svg"} alt={meeting.studentName} />
                        <AvatarFallback>{meeting.studentName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{meeting.studentName}</h3>
                          <Badge className={getStatusColor(meeting.status)}>{meeting.status}</Badge>
                        </div>
                        <p className="text-sm font-medium mb-2">{meeting.topic}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {meeting.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {meeting.time}
                          </span>
                          <span>{meeting.duration}</span>
                        </div>
                        {meeting.notes && (
                          <div className="bg-gray-50 p-3 rounded text-sm">
                            <strong>Notes:</strong> {meeting.notes}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {completedMeetings.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">No completed meetings</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Dialog */}
      <Dialog open={isActionDialogOpen} onOpenChange={setIsActionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === "approve" && "Approve Meeting Request"}
              {actionType === "decline" && "Decline Meeting Request"}
              {actionType === "reschedule" && "Reschedule Meeting Request"}
            </DialogTitle>
            <DialogDescription>
              {selectedRequest && `Meeting with ${selectedRequest.studentName}: ${selectedRequest.topic}`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {actionType === "approve" && (
              <div className="space-y-2">
                <p className="text-sm">
                  Confirm approval for the meeting on {selectedRequest?.proposedDate} at {selectedRequest?.proposedTime}
                </p>
                <div className="bg-green-50 p-3 rounded text-sm">
                  <strong>Note:</strong> A meeting link will be automatically generated and sent to the student.
                </div>
              </div>
            )}

            {actionType === "reschedule" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rescheduleDate">New Date</Label>
                    <Input
                      id="rescheduleDate"
                      type="date"
                      value={rescheduleDate}
                      onChange={(e) => setRescheduleDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rescheduleTime">New Time</Label>
                    <Input
                      id="rescheduleTime"
                      type="time"
                      value={rescheduleTime}
                      onChange={(e) => setRescheduleTime(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {actionType === "decline" && (
              <div className="space-y-2">
                <Label htmlFor="declineReason">Reason for declining (optional)</Label>
                <Textarea
                  id="declineReason"
                  value={declineReason}
                  onChange={(e) => setDeclineReason(e.target.value)}
                  placeholder="Provide a reason for declining this meeting request..."
                />
              </div>
            )}

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsActionDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={submitAction}>
                {actionType === "approve" && "Approve Meeting"}
                {actionType === "decline" && "Decline Request"}
                {actionType === "reschedule" && "Reschedule Meeting"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
