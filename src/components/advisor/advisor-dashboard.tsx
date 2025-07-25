"use client";

import { useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AssignedStudentsView } from "./assigned-students-view";
import { MeetingRequestManagement } from "./meeting-request-management";
import { AdvisorChatInterface } from "./advisor-chat-interface";
import { useAuth } from "@/components/providers/auth-provider";
import { Shield, Users, Calendar } from "lucide-react";
import { AdvisorScheduleView } from "./advisor-schedule-view";
import { AdvisorAvailabilityManagement } from "./advisor-availability-management";
import { AdvisorEventManagement } from "./advisor-event-management";
import { AdvisorResourceManagement } from "./advisor-resource-management";
import { Clock, CalendarDays, BookOpen } from "lucide-react";

export function AdvisorDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("students");

  // Check if user has advisor role
  if (user?.role !== "ADVISOR") {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="mx-auto max-w-md">
          <CardHeader className="text-center">
            <Shield className="mx-auto mb-4 h-12 w-12 text-red-500" />
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              You don't have advisor privileges to access this section.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Advisor Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome back, {user.name}! Manage your assigned students, meetings,
          and communications
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="students" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            My Students
          </TabsTrigger>
          <TabsTrigger value="meetings" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Meetings
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Schedule
          </TabsTrigger>
          <TabsTrigger value="availability" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Availability
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            Events
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Resources
          </TabsTrigger>
        </TabsList>

        <TabsContent value="students">
          <AssignedStudentsView />
        </TabsContent>

        <TabsContent value="meetings">
          <MeetingRequestManagement />
        </TabsContent>

        <TabsContent value="schedule">
          <AdvisorScheduleView />
        </TabsContent>

        <TabsContent value="availability">
          <AdvisorAvailabilityManagement />
        </TabsContent>

        <TabsContent value="events">
          <AdvisorEventManagement />
        </TabsContent>

        <TabsContent value="resources">
          <AdvisorResourceManagement />
        </TabsContent>

        <TabsContent value="chat">
          <AdvisorChatInterface />
        </TabsContent>
      </Tabs>
    </div>
  );
}
