"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Settings,
  Bell,
  Shield,
  Mail,
  GraduationCap,
  Palette,
  Save,
  AlertTriangle,
  CheckCircle,
  Globe,
  Lock,
  Database,
} from "lucide-react";

export function SystemSettingsDashboard() {
  const [settings, setSettings] = useState({
    general: {
      siteName: "IUT Douala Student Platform",
      siteDescription: "Academic management system for IUT Douala",
      contactEmail: "admin@iut-douala.cm",
      supportPhone: "+237 233 XX XX XX",
      maintenanceMode: false,
      registrationEnabled: true,
      defaultLanguage: "fr",
      timezone: "Africa/Douala",
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      advisorAssignmentNotify: true,
      meetingReminders: true,
      gradeNotifications: true,
      systemAlerts: true,
    },
    security: {
      passwordMinLength: 8,
      requireSpecialChars: true,
      requireNumbers: true,
      requireUppercase: true,
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      twoFactorAuth: false,
      encryptionEnabled: true,
    },
    email: {
      smtpHost: "smtp.gmail.com",
      smtpPort: 587,
      smtpUsername: "noreply@iut-douala.cm",
      smtpPassword: "••••••••",
      fromName: "IUT Douala Platform",
      fromEmail: "noreply@iut-douala.cm",
    },
    academic: {
      minGPA: 2.0,
      maxCreditsPerSemester: 21,
      gradeScale: "4.0",
      attendanceRequired: 75,
      advisorMaxStudents: 25,
      meetingDurationDefault: 30,
    },
    appearance: {
      primaryColor: "#3B82F6",
      secondaryColor: "#10B981",
      logoUrl: "/logo.png",
      faviconUrl: "/favicon.ico",
      customCSS: "",
      darkModeEnabled: true,
    },
  });

  const [activeTab, setActiveTab] = useState("general");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleSettingChange = (category: string, key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value,
      },
    }));
    setHasUnsavedChanges(true);
  };

  const handleSaveSettings = () => {
    // Here you would typically save to your backend
    console.log("Saving settings:", settings);
    setHasUnsavedChanges(false);
    // Show success message
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold">System Settings</h2>
          <p className="text-muted-foreground">
            Configure system-wide settings and preferences
          </p>
        </div>
        <div className="flex items-center gap-2">
          {hasUnsavedChanges && (
            <Badge
              variant="outline"
              className="border-yellow-600 text-yellow-600"
            >
              <AlertTriangle className="mr-1 h-3 w-3" />
              Unsaved Changes
            </Badge>
          )}
          <Button onClick={handleSaveSettings} disabled={!hasUnsavedChanges}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="flex items-center gap-2"
          >
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email
          </TabsTrigger>
          <TabsTrigger value="academic" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            Academic
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Appearance
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                General Settings
              </CardTitle>
              <CardDescription>
                Basic system configuration and information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.general.siteName}
                    onChange={(e) =>
                      handleSettingChange("general", "siteName", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={settings.general.contactEmail}
                    onChange={(e) =>
                      handleSettingChange(
                        "general",
                        "contactEmail",
                        e.target.value,
                      )
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.general.siteDescription}
                  onChange={(e) =>
                    handleSettingChange(
                      "general",
                      "siteDescription",
                      e.target.value,
                    )
                  }
                />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="supportPhone">Support Phone</Label>
                  <Input
                    id="supportPhone"
                    value={settings.general.supportPhone}
                    onChange={(e) =>
                      handleSettingChange(
                        "general",
                        "supportPhone",
                        e.target.value,
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={settings.general.timezone}
                    onValueChange={(value) =>
                      handleSettingChange("general", "timezone", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Africa/Douala">
                        Africa/Douala
                      </SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="Europe/Paris">Europe/Paris</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Maintenance Mode</Label>
                    <p className="text-muted-foreground text-sm">
                      Enable to temporarily disable access for maintenance
                    </p>
                  </div>
                  <Switch
                    checked={settings.general.maintenanceMode}
                    onCheckedChange={(checked) =>
                      handleSettingChange("general", "maintenanceMode", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Registration Enabled</Label>
                    <p className="text-muted-foreground text-sm">
                      Allow new users to register accounts
                    </p>
                  </div>
                  <Switch
                    checked={settings.general.registrationEnabled}
                    onCheckedChange={(checked) =>
                      handleSettingChange(
                        "general",
                        "registrationEnabled",
                        checked,
                      )
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>
                Configure system notifications and alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-muted-foreground text-sm">
                      Send notifications via email
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.emailNotifications}
                    onCheckedChange={(checked) =>
                      handleSettingChange(
                        "notifications",
                        "emailNotifications",
                        checked,
                      )
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SMS Notifications</Label>
                    <p className="text-muted-foreground text-sm">
                      Send notifications via SMS
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.smsNotifications}
                    onCheckedChange={(checked) =>
                      handleSettingChange(
                        "notifications",
                        "smsNotifications",
                        checked,
                      )
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-muted-foreground text-sm">
                      Send browser push notifications
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.pushNotifications}
                    onCheckedChange={(checked) =>
                      handleSettingChange(
                        "notifications",
                        "pushNotifications",
                        checked,
                      )
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Advisor Assignment Notifications</Label>
                    <p className="text-muted-foreground text-sm">
                      Notify when advisors are assigned to students
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.advisorAssignmentNotify}
                    onCheckedChange={(checked) =>
                      handleSettingChange(
                        "notifications",
                        "advisorAssignmentNotify",
                        checked,
                      )
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Meeting Reminders</Label>
                    <p className="text-muted-foreground text-sm">
                      Send reminders for upcoming meetings
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.meetingReminders}
                    onCheckedChange={(checked) =>
                      handleSettingChange(
                        "notifications",
                        "meetingReminders",
                        checked,
                      )
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Grade Notifications</Label>
                    <p className="text-muted-foreground text-sm">
                      Notify students when grades are posted
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.gradeNotifications}
                    onCheckedChange={(checked) =>
                      handleSettingChange(
                        "notifications",
                        "gradeNotifications",
                        checked,
                      )
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>System Alerts</Label>
                    <p className="text-muted-foreground text-sm">
                      Send alerts for system issues and maintenance
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.systemAlerts}
                    onCheckedChange={(checked) =>
                      handleSettingChange(
                        "notifications",
                        "systemAlerts",
                        checked,
                      )
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Configure security policies and authentication
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="passwordMinLength">
                    Minimum Password Length
                  </Label>
                  <Input
                    id="passwordMinLength"
                    type="number"
                    value={settings.security.passwordMinLength}
                    onChange={(e) =>
                      handleSettingChange(
                        "security",
                        "passwordMinLength",
                        Number.parseInt(e.target.value),
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">
                    Session Timeout (minutes)
                  </Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={settings.security.sessionTimeout}
                    onChange={(e) =>
                      handleSettingChange(
                        "security",
                        "sessionTimeout",
                        Number.parseInt(e.target.value),
                      )
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxLoginAttempts">Maximum Login Attempts</Label>
                <Input
                  id="maxLoginAttempts"
                  type="number"
                  value={settings.security.maxLoginAttempts}
                  onChange={(e) =>
                    handleSettingChange(
                      "security",
                      "maxLoginAttempts",
                      Number.parseInt(e.target.value),
                    )
                  }
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require Special Characters</Label>
                    <p className="text-muted-foreground text-sm">
                      Passwords must contain special characters
                    </p>
                  </div>
                  <Switch
                    checked={settings.security.requireSpecialChars}
                    onCheckedChange={(checked) =>
                      handleSettingChange(
                        "security",
                        "requireSpecialChars",
                        checked,
                      )
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require Numbers</Label>
                    <p className="text-muted-foreground text-sm">
                      Passwords must contain numbers
                    </p>
                  </div>
                  <Switch
                    checked={settings.security.requireNumbers}
                    onCheckedChange={(checked) =>
                      handleSettingChange("security", "requireNumbers", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require Uppercase Letters</Label>
                    <p className="text-muted-foreground text-sm">
                      Passwords must contain uppercase letters
                    </p>
                  </div>
                  <Switch
                    checked={settings.security.requireUppercase}
                    onCheckedChange={(checked) =>
                      handleSettingChange(
                        "security",
                        "requireUppercase",
                        checked,
                      )
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-muted-foreground text-sm">
                      Enable 2FA for enhanced security
                    </p>
                  </div>
                  <Switch
                    checked={settings.security.twoFactorAuth}
                    onCheckedChange={(checked) =>
                      handleSettingChange("security", "twoFactorAuth", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Data Encryption</Label>
                    <p className="text-muted-foreground text-sm">
                      Enable encryption for sensitive data
                    </p>
                  </div>
                  <Switch
                    checked={settings.security.encryptionEnabled}
                    onCheckedChange={(checked) =>
                      handleSettingChange(
                        "security",
                        "encryptionEnabled",
                        checked,
                      )
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Configuration
              </CardTitle>
              <CardDescription>
                Configure SMTP settings for outgoing emails
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="smtpHost">SMTP Host</Label>
                  <Input
                    id="smtpHost"
                    value={settings.email.smtpHost}
                    onChange={(e) =>
                      handleSettingChange("email", "smtpHost", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input
                    id="smtpPort"
                    type="number"
                    value={settings.email.smtpPort}
                    onChange={(e) =>
                      handleSettingChange(
                        "email",
                        "smtpPort",
                        Number.parseInt(e.target.value),
                      )
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="smtpUsername">SMTP Username</Label>
                  <Input
                    id="smtpUsername"
                    value={settings.email.smtpUsername}
                    onChange={(e) =>
                      handleSettingChange(
                        "email",
                        "smtpUsername",
                        e.target.value,
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPassword">SMTP Password</Label>
                  <Input
                    id="smtpPassword"
                    type="password"
                    value={settings.email.smtpPassword}
                    onChange={(e) =>
                      handleSettingChange(
                        "email",
                        "smtpPassword",
                        e.target.value,
                      )
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fromName">From Name</Label>
                  <Input
                    id="fromName"
                    value={settings.email.fromName}
                    onChange={(e) =>
                      handleSettingChange("email", "fromName", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fromEmail">From Email</Label>
                  <Input
                    id="fromEmail"
                    type="email"
                    value={settings.email.fromEmail}
                    onChange={(e) =>
                      handleSettingChange("email", "fromEmail", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="flex justify-start">
                <Button variant="outline">
                  <Mail className="mr-2 h-4 w-4" />
                  Test Email Configuration
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Academic Settings */}
        <TabsContent value="academic">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Academic Policies
              </CardTitle>
              <CardDescription>
                Configure academic rules and requirements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="minGPA">Minimum GPA Requirement</Label>
                  <Input
                    id="minGPA"
                    type="number"
                    step="0.1"
                    value={settings.academic.minGPA}
                    onChange={(e) =>
                      handleSettingChange(
                        "academic",
                        "minGPA",
                        Number.parseFloat(e.target.value),
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxCredits">Max Credits Per Semester</Label>
                  <Input
                    id="maxCredits"
                    type="number"
                    value={settings.academic.maxCreditsPerSemester}
                    onChange={(e) =>
                      handleSettingChange(
                        "academic",
                        "maxCreditsPerSemester",
                        Number.parseInt(e.target.value),
                      )
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="gradeScale">Grade Scale</Label>
                  <Select
                    value={settings.academic.gradeScale}
                    onValueChange={(value) =>
                      handleSettingChange("academic", "gradeScale", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4.0">4.0 Scale</SelectItem>
                      <SelectItem value="5.0">5.0 Scale</SelectItem>
                      <SelectItem value="20">20 Point Scale</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="attendanceRequired">
                    Required Attendance (%)
                  </Label>
                  <Input
                    id="attendanceRequired"
                    type="number"
                    value={settings.academic.attendanceRequired}
                    onChange={(e) =>
                      handleSettingChange(
                        "academic",
                        "attendanceRequired",
                        Number.parseInt(e.target.value),
                      )
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="advisorMaxStudents">
                    Max Students Per Advisor
                  </Label>
                  <Input
                    id="advisorMaxStudents"
                    type="number"
                    value={settings.academic.advisorMaxStudents}
                    onChange={(e) =>
                      handleSettingChange(
                        "academic",
                        "advisorMaxStudents",
                        Number.parseInt(e.target.value),
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meetingDuration">
                    Default Meeting Duration (minutes)
                  </Label>
                  <Input
                    id="meetingDuration"
                    type="number"
                    value={settings.academic.meetingDurationDefault}
                    onChange={(e) =>
                      handleSettingChange(
                        "academic",
                        "meetingDurationDefault",
                        Number.parseInt(e.target.value),
                      )
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Appearance & Branding
              </CardTitle>
              <CardDescription>
                Customize the look and feel of the platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="primaryColor"
                      value={settings.appearance.primaryColor}
                      onChange={(e) =>
                        handleSettingChange(
                          "appearance",
                          "primaryColor",
                          e.target.value,
                        )
                      }
                    />
                    <div className="primary-color-preview h-10 w-10 rounded border" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="secondaryColor"
                      value={settings.appearance.secondaryColor}
                      onChange={(e) =>
                        handleSettingChange(
                          "appearance",
                          "secondaryColor",
                          e.target.value,
                        )
                      }
                    />
                    <div className="secondary-color-preview h-10 w-10 rounded border" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="logoUrl">Logo URL</Label>
                  <Input
                    id="logoUrl"
                    value={settings.appearance.logoUrl}
                    onChange={(e) =>
                      handleSettingChange(
                        "appearance",
                        "logoUrl",
                        e.target.value,
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="faviconUrl">Favicon URL</Label>
                  <Input
                    id="faviconUrl"
                    value={settings.appearance.faviconUrl}
                    onChange={(e) =>
                      handleSettingChange(
                        "appearance",
                        "faviconUrl",
                        e.target.value,
                      )
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="customCSS">Custom CSS</Label>
                <Textarea
                  id="customCSS"
                  placeholder="/* Add your custom CSS here */"
                  value={settings.appearance.customCSS}
                  onChange={(e) =>
                    handleSettingChange(
                      "appearance",
                      "customCSS",
                      e.target.value,
                    )
                  }
                  className="font-mono text-sm"
                  rows={6}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Dark Mode Support</Label>
                  <p className="text-muted-foreground text-sm">
                    Enable dark mode theme option
                  </p>
                </div>
                <Switch
                  checked={settings.appearance.darkModeEnabled}
                  onCheckedChange={(checked) =>
                    handleSettingChange(
                      "appearance",
                      "darkModeEnabled",
                      checked,
                    )
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            System Status
          </CardTitle>
          <CardDescription>
            Current system health and status information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="flex items-center gap-3 rounded-lg border p-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="font-medium">Database</p>
                <p className="text-muted-foreground text-sm">Connected</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border p-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="font-medium">Email Service</p>
                <p className="text-muted-foreground text-sm">Operational</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border p-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="font-medium">File Storage</p>
                <p className="text-muted-foreground text-sm">Available</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
