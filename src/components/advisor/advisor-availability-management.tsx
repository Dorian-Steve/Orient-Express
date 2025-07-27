"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar, Clock, Plus, Edit, Trash2, Save } from "lucide-react"

// Mock data for availability settings
const weeklyAvailability = {
  monday: { enabled: true, startTime: "09:00", endTime: "17:00", breakStart: "12:00", breakEnd: "13:00" },
  tuesday: { enabled: true, startTime: "09:00", endTime: "17:00", breakStart: "12:00", breakEnd: "13:00" },
  wednesday: { enabled: true, startTime: "09:00", endTime: "17:00", breakStart: "12:00", breakEnd: "13:00" },
  thursday: { enabled: true, startTime: "09:00", endTime: "17:00", breakStart: "12:00", breakEnd: "13:00" },
  friday: { enabled: true, startTime: "09:00", endTime: "15:00", breakStart: "12:00", breakEnd: "13:00" },
  saturday: { enabled: false, startTime: "10:00", endTime: "14:00", breakStart: "", breakEnd: "" },
  sunday: { enabled: false, startTime: "10:00", endTime: "14:00", breakStart: "", breakEnd: "" },
}

const specialAvailability = [
  {
    id: "1",
    date: "2024-01-20",
    type: "unavailable",
    reason: "Conference Attendance",
    allDay: true,
    startTime: "",
    endTime: "",
  },
  {
    id: "2",
    date: "2024-01-25",
    type: "extended",
    reason: "Extended Office Hours",
    allDay: false,
    startTime: "08:00",
    endTime: "19:00",
  },
  {
    id: "3",
    date: "2024-02-01",
    type: "unavailable",
    reason: "Personal Leave",
    allDay: true,
    startTime: "",
    endTime: "",
  },
]

const appointmentSettings = {
  defaultDuration: 45,
  bufferTime: 15,
  maxAdvanceBooking: 30,
  minAdvanceBooking: 24,
  allowWeekends: false,
  autoApprove: false,
  requireReason: true,
}

export function AdvisorAvailabilityManagement() {
  const [availability, setAvailability] = useState(weeklyAvailability)
  const [special, setSpecial] = useState(specialAvailability)
  const [settings, setSettings] = useState(appointmentSettings)
  const [isAddingSpecial, setIsAddingSpecial] = useState(false)
  const [newSpecial, setNewSpecial] = useState({
    date: "",
    type: "unavailable",
    reason: "",
    allDay: true,
    startTime: "",
    endTime: "",
  })

  const days = [
    { key: "monday", label: "Monday" },
    { key: "tuesday", label: "Tuesday" },
    { key: "wednesday", label: "Wednesday" },
    { key: "thursday", label: "Thursday" },
    { key: "friday", label: "Friday" },
    { key: "saturday", label: "Saturday" },
    { key: "sunday", label: "Sunday" },
  ]

  const updateDayAvailability = (day: string, field: string, value: any) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day as keyof typeof prev],
        [field]: value,
      },
    }))
  }

  const addSpecialAvailability = () => {
    if (!newSpecial.date || !newSpecial.reason) return

    const id = Date.now().toString()
    setSpecial((prev) => [...prev, { ...newSpecial, id }])
    setNewSpecial({
      date: "",
      type: "unavailable",
      reason: "",
      allDay: true,
      startTime: "",
      endTime: "",
    })
    setIsAddingSpecial(false)
  }

  const removeSpecialAvailability = (id: string) => {
    setSpecial((prev) => prev.filter((item) => item.id !== id))
  }

  const getSpecialTypeColor = (type: string) => {
    switch (type) {
      case "unavailable":
        return "bg-red-100 text-red-800"
      case "extended":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Availability Management</h2>
        <p className="text-gray-600">Set your regular schedule and manage special availability</p>
      </div>

      {/* Weekly Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Schedule</CardTitle>
          <CardDescription>Set your regular weekly availability for student appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {days.map((day) => {
              const dayData = availability[day.key as keyof typeof availability]
              return (
                <div key={day.key} className="flex items-center gap-4 p-4 rounded-lg border">
                  <div className="w-24">
                    <Label className="font-medium">{day.label}</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={dayData.enabled}
                      onCheckedChange={(checked) => updateDayAvailability(day.key, "enabled", checked)}
                    />
                    <span className="text-sm text-gray-600">Available</span>
                  </div>
                  {dayData.enabled && (
                    <>
                      <div className="flex items-center gap-2">
                        <Label className="text-sm">From:</Label>
                        <Input
                          type="time"
                          value={dayData.startTime}
                          onChange={(e) => updateDayAvailability(day.key, "startTime", e.target.value)}
                          className="w-32"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Label className="text-sm">To:</Label>
                        <Input
                          type="time"
                          value={dayData.endTime}
                          onChange={(e) => updateDayAvailability(day.key, "endTime", e.target.value)}
                          className="w-32"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Label className="text-sm">Break:</Label>
                        <Input
                          type="time"
                          value={dayData.breakStart}
                          onChange={(e) => updateDayAvailability(day.key, "breakStart", e.target.value)}
                          className="w-32"
                          placeholder="Start"
                        />
                        <span className="text-sm text-gray-400">to</span>
                        <Input
                          type="time"
                          value={dayData.breakEnd}
                          onChange={(e) => updateDayAvailability(day.key, "breakEnd", e.target.value)}
                          className="w-32"
                          placeholder="End"
                        />
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
          <div className="flex justify-end mt-4">
            <Button>
              <Save className="w-4 h-4 mr-2" />
              Save Weekly Schedule
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Special Availability */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Special Availability</CardTitle>
              <CardDescription>Set exceptions to your regular schedule</CardDescription>
            </div>
            <Dialog open={isAddingSpecial} onOpenChange={setIsAddingSpecial}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Exception
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Special Availability</DialogTitle>
                  <DialogDescription>
                    Set a specific date when your availability differs from your regular schedule
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="specialDate">Date</Label>
                    <Input
                      id="specialDate"
                      type="date"
                      value={newSpecial.date}
                      onChange={(e) => setNewSpecial((prev) => ({ ...prev, date: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialType">Type</Label>
                    <Select
                      value={newSpecial.type}
                      onValueChange={(value) => setNewSpecial((prev) => ({ ...prev, type: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unavailable">Unavailable</SelectItem>
                        <SelectItem value="extended">Extended Hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialReason">Reason</Label>
                    <Input
                      id="specialReason"
                      value={newSpecial.reason}
                      onChange={(e) => setNewSpecial((prev) => ({ ...prev, reason: e.target.value }))}
                      placeholder="Conference, vacation, extended office hours..."
                    />
                  </div>
                  {newSpecial.type === "extended" && (
                    <>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={newSpecial.allDay}
                          onCheckedChange={(checked) => setNewSpecial((prev) => ({ ...prev, allDay: checked }))}
                        />
                        <Label>All day</Label>
                      </div>
                      {!newSpecial.allDay && (
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Start Time</Label>
                            <Input
                              type="time"
                              value={newSpecial.startTime}
                              onChange={(e) => setNewSpecial((prev) => ({ ...prev, startTime: e.target.value }))}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>End Time</Label>
                            <Input
                              type="time"
                              value={newSpecial.endTime}
                              onChange={(e) => setNewSpecial((prev) => ({ ...prev, endTime: e.target.value }))}
                            />
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsAddingSpecial(false)}>
                      Cancel
                    </Button>
                    <Button onClick={addSpecialAvailability}>Add Exception</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {special.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">{new Date(item.date).toLocaleDateString()}</span>
                  </div>
                  <Badge className={getSpecialTypeColor(item.type)}>
                    {item.type === "unavailable" ? "Unavailable" : "Extended Hours"}
                  </Badge>
                  <span className="text-sm text-gray-600">{item.reason}</span>
                  {!item.allDay && item.startTime && item.endTime && (
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="w-3 h-3" />
                      {item.startTime} - {item.endTime}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => removeSpecialAvailability(item.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
            {special.length === 0 && (
              <div className="text-center py-8 text-gray-500">No special availability exceptions set</div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Appointment Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Appointment Settings</CardTitle>
          <CardDescription>Configure how students can book appointments with you</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="defaultDuration">Default Meeting Duration (minutes)</Label>
                <Input
                  id="defaultDuration"
                  type="number"
                  value={settings.defaultDuration}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, defaultDuration: Number.parseInt(e.target.value) }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bufferTime">Buffer Time Between Meetings (minutes)</Label>
                <Input
                  id="bufferTime"
                  type="number"
                  value={settings.bufferTime}
                  onChange={(e) => setSettings((prev) => ({ ...prev, bufferTime: Number.parseInt(e.target.value) }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxAdvance">Maximum Advance Booking (days)</Label>
                <Input
                  id="maxAdvance"
                  type="number"
                  value={settings.maxAdvanceBooking}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, maxAdvanceBooking: Number.parseInt(e.target.value) }))
                  }
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="minAdvance">Minimum Advance Booking (hours)</Label>
                <Input
                  id="minAdvance"
                  type="number"
                  value={settings.minAdvanceBooking}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, minAdvanceBooking: Number.parseInt(e.target.value) }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="allowWeekends">Allow Weekend Appointments</Label>
                <Switch
                  id="allowWeekends"
                  checked={settings.allowWeekends}
                  onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, allowWeekends: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="autoApprove">Auto-approve Appointments</Label>
                <Switch
                  id="autoApprove"
                  checked={settings.autoApprove}
                  onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, autoApprove: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="requireReason">Require Appointment Reason</Label>
                <Switch
                  id="requireReason"
                  checked={settings.requireReason}
                  onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, requireReason: checked }))}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <Button>
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
