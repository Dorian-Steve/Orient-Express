"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, MapPin, Users, Plus, Edit, Trash2, Eye } from "lucide-react"

// Mock data for advisor events
const advisorEvents = [
  {
    id: "1",
    title: "Career Development Workshop",
    description: "Interactive workshop on resume building and interview skills for final year students.",
    type: "workshop",
    date: "2024-02-15",
    time: "14:00",
    duration: "2 hours",
    location: "Conference Room A",
    capacity: 30,
    registered: 18,
    status: "published",
    targetAudience: "Final Year Students",
    createdAt: "2024-01-10",
  },
  {
    id: "2",
    title: "Industry Networking Session",
    description: "Meet with industry professionals and explore internship opportunities.",
    type: "networking",
    date: "2024-02-20",
    time: "16:00",
    duration: "3 hours",
    location: "Main Hall",
    capacity: 50,
    registered: 35,
    status: "published",
    targetAudience: "All Students",
    createdAt: "2024-01-12",
  },
  {
    id: "3",
    title: "Study Skills Seminar",
    description: "Learn effective study techniques and time management strategies.",
    type: "seminar",
    date: "2024-02-25",
    time: "10:00",
    duration: "1.5 hours",
    location: "Lecture Hall B",
    capacity: 40,
    registered: 12,
    status: "draft",
    targetAudience: "First & Second Year",
    createdAt: "2024-01-15",
  },
]

export function AdvisorEventManagement() {
  const [events, setEvents] = useState(advisorEvents)
  const [isCreating, setIsCreating] = useState(false)
  const [editingEvent, setEditingEvent] = useState<(typeof advisorEvents)[0] | null>(null)
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    type: "seminar",
    date: "",
    time: "",
    duration: "",
    location: "",
    capacity: 30,
    targetAudience: "All Students",
  })

  const eventTypes = [
    { value: "seminar", label: "Seminar" },
    { value: "workshop", label: "Workshop" },
    { value: "networking", label: "Networking" },
    { value: "conference", label: "Conference" },
    { value: "training", label: "Training" },
  ]

  const audiences = [
    { value: "All Students", label: "All Students" },
    { value: "First Year", label: "First Year" },
    { value: "Second Year", label: "Second Year" },
    { value: "Third Year", label: "Third Year" },
    { value: "Final Year Students", label: "Final Year Students" },
    { value: "Graduate Students", label: "Graduate Students" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "seminar":
        return "bg-blue-100 text-blue-800"
      case "workshop":
        return "bg-purple-100 text-purple-800"
      case "networking":
        return "bg-green-100 text-green-800"
      case "conference":
        return "bg-orange-100 text-orange-800"
      case "training":
        return "bg-indigo-100 text-indigo-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleCreateEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.time) return

    const event = {
      id: Date.now().toString(),
      ...newEvent,
      registered: 0,
      status: "draft",
      createdAt: new Date().toISOString().split("T")[0],
    }

    setEvents((prev) => [event, ...prev])
    setNewEvent({
      title: "",
      description: "",
      type: "seminar",
      date: "",
      time: "",
      duration: "",
      location: "",
      capacity: 30,
      targetAudience: "All Students",
    })
    setIsCreating(false)
  }

  const handlePublishEvent = (eventId: string) => {
    setEvents((prev) => prev.map((event) => (event.id === eventId ? { ...event, status: "published" } : event)))
  }

  const handleDeleteEvent = (eventId: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== eventId))
  }

  const publishedEvents = events.filter((event) => event.status === "published")
  const draftEvents = events.filter((event) => event.status === "draft")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Event Management</h2>
          <p className="text-gray-600">Create and manage events for your students</p>
        </div>
        <Dialog open={isCreating} onOpenChange={setIsCreating}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
              <DialogDescription>Create an event for your students to attend</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="eventTitle">Event Title</Label>
                  <Input
                    id="eventTitle"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter event title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eventType">Event Type</Label>
                  <Select
                    value={newEvent.type}
                    onValueChange={(value) => setNewEvent((prev) => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="eventDescription">Description</Label>
                <Textarea
                  id="eventDescription"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your event"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="eventDate">Date</Label>
                  <Input
                    id="eventDate"
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent((prev) => ({ ...prev, date: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eventTime">Time</Label>
                  <Input
                    id="eventTime"
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent((prev) => ({ ...prev, time: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eventDuration">Duration</Label>
                  <Input
                    id="eventDuration"
                    value={newEvent.duration}
                    onChange={(e) => setNewEvent((prev) => ({ ...prev, duration: e.target.value }))}
                    placeholder="e.g., 2 hours"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="eventLocation">Location</Label>
                  <Input
                    id="eventLocation"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent((prev) => ({ ...prev, location: e.target.value }))}
                    placeholder="Event location"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eventCapacity">Capacity</Label>
                  <Input
                    id="eventCapacity"
                    type="number"
                    value={newEvent.capacity}
                    onChange={(e) => setNewEvent((prev) => ({ ...prev, capacity: Number.parseInt(e.target.value) }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Select
                  value={newEvent.targetAudience}
                  onValueChange={(value) => setNewEvent((prev) => ({ ...prev, targetAudience: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {audiences.map((audience) => (
                      <SelectItem key={audience.value} value={audience.value}>
                        {audience.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreating(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateEvent}>Create Event</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Event Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{events.length}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{publishedEvents.length}</div>
            <p className="text-xs text-muted-foreground">Live events</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{events.reduce((sum, event) => sum + event.registered, 0)}</div>
            <p className="text-xs text-muted-foreground">Student registrations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            <Edit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{draftEvents.length}</div>
            <p className="text-xs text-muted-foreground">Unpublished</p>
          </CardContent>
        </Card>
      </div>

      {/* Events Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Events ({events.length})</TabsTrigger>
          <TabsTrigger value="published">Published ({publishedEvents.length})</TabsTrigger>
          <TabsTrigger value="drafts">Drafts ({draftEvents.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Events</CardTitle>
              <CardDescription>Manage all your created events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="p-4 rounded-lg border">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{event.title}</h3>
                          <Badge className={getTypeColor(event.type)}>{event.type}</Badge>
                          <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
                        </div>
                        <p className="text-gray-600 mb-3">{event.description}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(event.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {event.time} ({event.duration})
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {event.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {event.registered}/{event.capacity} registered
                          </div>
                        </div>
                        <div className="mt-2">
                          <span className="text-sm text-gray-500">Target: {event.targetAudience}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        {event.status === "draft" && (
                          <Button size="sm" onClick={() => handlePublishEvent(event.id)}>
                            Publish
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDeleteEvent(event.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                {events.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No events created yet. Create your first event to get started.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="published">
          <Card>
            <CardHeader>
              <CardTitle>Published Events</CardTitle>
              <CardDescription>Events that are live and accepting registrations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {publishedEvents.map((event) => (
                  <div key={event.id} className="p-4 rounded-lg border border-green-200 bg-green-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{event.title}</h3>
                          <Badge className={getTypeColor(event.type)}>{event.type}</Badge>
                        </div>
                        <p className="text-gray-600 mb-3">{event.description}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(event.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {event.time}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {event.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {event.registered}/{event.capacity}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button size="sm" variant="outline">
                          View Registrations
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                {publishedEvents.length === 0 && (
                  <div className="text-center py-8 text-gray-500">No published events yet.</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drafts">
          <Card>
            <CardHeader>
              <CardTitle>Draft Events</CardTitle>
              <CardDescription>Events that are not yet published</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {draftEvents.map((event) => (
                  <div key={event.id} className="p-4 rounded-lg border border-yellow-200 bg-yellow-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{event.title}</h3>
                          <Badge className={getTypeColor(event.type)}>{event.type}</Badge>
                          <Badge className="bg-yellow-100 text-yellow-800">Draft</Badge>
                        </div>
                        <p className="text-gray-600 mb-3">{event.description}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(event.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {event.time}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {event.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            Capacity: {event.capacity}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button size="sm" onClick={() => handlePublishEvent(event.id)}>
                          Publish
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDeleteEvent(event.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                {draftEvents.length === 0 && <div className="text-center py-8 text-gray-500">No draft events.</div>}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
