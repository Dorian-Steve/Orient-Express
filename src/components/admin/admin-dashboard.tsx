"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdvisorAssignmentDashboard } from "./advisor-assignment-dashboard";
import { SystemOverviewDashboard } from "./system-overview-dashboard";
import { UserManagementDashboard } from "./user-management-dashboard";
import { ProgramManagementDashboard } from "./program-management-dashboard";
import { AdvisorManagementDashboard } from "./advisor-management-dashboard";
import { ActivityMonitoringDashboard } from "./activity-monitoring-dashboard";
import { SystemSettingsDashboard } from "./system-settings-dashboard";
import { useAuth } from "@/components/providers/auth-provider";
import {
  Shield,
  Users,
  BarChart3,
  Settings,
  BookOpen,
  UserCheck,
  Activity,
  Cog,
} from "lucide-react";

export function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  // Check if user has admin role
  if (user?.role !== "ADMIN") {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="mx-auto max-w-md">
          <CardHeader className="text-center">
            <Shield className="mx-auto mb-4 h-12 w-12 text-red-500" />
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              You don't have administrator privileges to access this section.
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
          Admin Dashboard
        </h1>
        <p className="text-gray-600">
          Complete system administration and management
        </p>
        <div className="mt-4 rounded-lg bg-blue-50 p-4">
          <p className="text-sm text-blue-800">
            <strong>Welcome, {user.name}!</strong> You have full administrative
            access to manage the IUT Douala platform.
          </p>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="programs" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Programs
          </TabsTrigger>
          <TabsTrigger value="advisors" className="flex items-center gap-2">
            <UserCheck className="h-4 w-4" />
            Advisors
          </TabsTrigger>
          <TabsTrigger value="assignments" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Assignments
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Activity
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Cog className="h-4 w-4" />
            Settings
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <SystemOverviewDashboard />
        </TabsContent>

        <TabsContent value="programs">
          <ProgramManagementDashboard />
        </TabsContent>

        <TabsContent value="advisors">
          <AdvisorManagementDashboard />
        </TabsContent>

        <TabsContent value="assignments">
          <AdvisorAssignmentDashboard />
        </TabsContent>

        <TabsContent value="users">
          <UserManagementDashboard />
        </TabsContent>

        <TabsContent value="activity">
          <ActivityMonitoringDashboard />
        </TabsContent>

        <TabsContent value="settings">
          <SystemSettingsDashboard />
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>System Reports</CardTitle>
              <CardDescription>
                Generate and view comprehensive system reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="p-4">
                  <h3 className="mb-2 font-semibold">
                    Academic Performance Report
                  </h3>
                  <p className="mb-4 text-sm text-gray-600">
                    Student grades, GPA trends, and program completion rates
                  </p>
                  <button className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                    Generate Report
                  </button>
                </Card>
                <Card className="p-4">
                  <h3 className="mb-2 font-semibold">Enrollment Statistics</h3>
                  <p className="mb-4 text-sm text-gray-600">
                    Student enrollment trends and program popularity
                  </p>
                  <button className="w-full rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700">
                    Generate Report
                  </button>
                </Card>
                <Card className="p-4">
                  <h3 className="mb-2 font-semibold">
                    Advisor Workload Report
                  </h3>
                  <p className="mb-4 text-sm text-gray-600">
                    Advisor assignments and meeting statistics
                  </p>
                  <button className="w-full rounded bg-purple-600 px-4 py-2 text-white hover:bg-purple-700">
                    Generate Report
                  </button>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
