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
import { FileText, BookOpen, Link, Video, Plus, Edit, Trash2, Download, Eye, Search } from "lucide-react"

// Mock data for advisor resources
const advisorResources = [
  {
    id: "1",
    title: "Resume Writing Guide",
    description: "Comprehensive guide for creating professional resumes with templates and examples.",
    type: "document",
    category: "Career Development",
    fileUrl: "/documents/resume-guide.pdf",
    fileSize: "2.5 MB",
    downloads: 45,
    status: "published",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Interview Preparation Checklist",
    description: "Step-by-step checklist to prepare for job interviews including common questions.",
    type: "document",
    category: "Career Development",
    fileUrl: "/documents/interview-prep.pdf",
    fileSize: "1.8 MB",
    downloads: 32,
    status: "published",
    createdAt: "2024-01-12",
    updatedAt: "2024-01-12",
  },
  {
    id: "3",
    title: "Study Techniques Video Series",
    description: "Video series covering effective study methods and time management strategies.",
    type: "video",
    category: "Academic Support",
    fileUrl: "https://youtube.com/watch?v=example",
    fileSize: "N/A",
    downloads: 28,
    status: "published",
    createdAt: "2024-01-08",
    updatedAt: "2024-01-10",
  },
  {
    id: "4",
    title: "Networking Tips for Students",
    description: "Essential networking strategies for building professional relationships.",
    type: "link",
    category: "Career Development",
    fileUrl: "https://example.com/networking-tips",
    fileSize: "N/A",
    downloads: 15,
    status: "draft",
    createdAt: "2024-01-14",
    updatedAt: "2024-01-14",
  },
  {
    id: "5",
    title: "Academic Writing Standards",
    description: "Guidelines for academic writing including citation styles and formatting.",
    type: "document",
    category: "Academic Support",
    fileUrl: "/documents/writing-standards.pdf",
    fileSize: "3.2 MB",
    downloads: 67,
    status: "published",
    createdAt: "2024-01-05",
    updatedAt: "2024-01-20",
  },
]

const resourceCategories = [
  { value: "Career Development", label: "Career Development" },
  { value: "Academic Support", label: "Academic Support" },
  { value: "Study Materials", label: "Study Materials" },
  { value: "Industry Insights", label: "Industry Insights" },
  { value: "Personal Development", label: "Personal Development" },
]

const resourceTypes = [
  { value: "document", label: "Document", icon: FileText },
  { value: "video", label: "Video", icon: Video },
  { value: "link", label: "External Link", icon: Link },
  { value: "book", label: "Book/eBook", icon: BookOpen },
]

export function AdvisorResourceManagement() {
  const [resources, setResources] = useState(advisorResources)
  const [isCreating, setIsCreating] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [newResource, setNewResource] = useState({
    title: "",
    description: "",
    type: "document",
    category: "Academic Support",
    fileUrl: "",
    file: null as File | null,
  })

  const getTypeIcon = (type: string) => {
    const typeObj = resourceTypes.find((t) => t.value === type)
    return typeObj ? typeObj.icon : FileText
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "document":
        return "bg-blue-100 text-blue-800"
      case "video":
        return "bg-purple-100 text-purple-800"
      case "link":
        return "bg-green-100 text-green-800"
      case "book":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleCreateResource = () => {
    if (!newResource.title || !newResource.description) return

    const resource = {
      id: Date.now().toString(),
      ...newResource,
      fileSize: newResource.file ? `${(newResource.file.size / 1024 / 1024).toFixed(1)} MB` : "N/A",
      downloads: 0,
      status: "draft",
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    }

    setResources((prev) => [resource, ...prev])
    setNewResource({
      title: "",
      description: "",
      type: "document",
      category: "Academic Support",
      fileUrl: "",
      file: null,
    })
    setIsCreating(false)
  }

  const handlePublishResource = (resourceId: string) => {
    setResources((prev) =>
      prev.map((resource) => (resource.id === resourceId ? { ...resource, status: "published" } : resource)),
    )
  }

  const handleDeleteResource = (resourceId: string) => {
    setResources((prev) => prev.filter((resource) => resource.id !== resourceId))
  }

  const publishedResources = resources.filter((resource) => resource.status === "published")
  const draftResources = resources.filter((resource) => resource.status === "draft")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Resource Management</h2>
          <p className="text-gray-600">Upload and manage resources for your students</p>
        </div>
        <Dialog open={isCreating} onOpenChange={setIsCreating}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Resource
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Resource</DialogTitle>
              <DialogDescription>Upload a new resource for your students</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="resourceTitle">Resource Title</Label>
                <Input
                  id="resourceTitle"
                  value={newResource.title}
                  onChange={(e) => setNewResource((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter resource title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="resourceDescription">Description</Label>
                <Textarea
                  id="resourceDescription"
                  value={newResource.description}
                  onChange={(e) => setNewResource((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the resource"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="resourceType">Resource Type</Label>
                  <Select
                    value={newResource.type}
                    onValueChange={(value) => setNewResource((prev) => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {resourceTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resourceCategory">Category</Label>
                  <Select
                    value={newResource.category}
                    onValueChange={(value) => setNewResource((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {resourceCategories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {newResource.type === "link" ? (
                <div className="space-y-2">
                  <Label htmlFor="resourceUrl">URL</Label>
                  <Input
                    id="resourceUrl"
                    type="url"
                    value={newResource.fileUrl}
                    onChange={(e) => setNewResource((prev) => ({ ...prev, fileUrl: e.target.value }))}
                    placeholder="https://example.com"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="resourceFile">Upload File</Label>
                  <Input
                    id="resourceFile"
                    type="file"
                    onChange={(e) =>
                      setNewResource((prev) => ({
                        ...prev,
                        file: e.target.files?.[0] || null,
                      }))
                    }
                    accept={
                      newResource.type === "video"
                        ? "video/*"
                        : newResource.type === "document"
                          ? ".pdf,.doc,.docx"
                          : "*"
                    }
                  />
                </div>
              )}
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreating(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateResource}>Add Resource</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Resource Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Resources</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resources.length}</div>
            <p className="text-xs text-muted-foreground">All resources</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{publishedResources.length}</div>
            <p className="text-xs text-muted-foreground">Live resources</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resources.reduce((sum, resource) => sum + resource.downloads, 0)}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            <Edit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{draftResources.length}</div>
            <p className="text-xs text-muted-foreground">Unpublished</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {resourceCategories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Resources Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Resources ({filteredResources.length})</TabsTrigger>
          <TabsTrigger value="published">Published ({publishedResources.length})</TabsTrigger>
          <TabsTrigger value="drafts">Drafts ({draftResources.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Resources</CardTitle>
              <CardDescription>Manage all your uploaded resources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredResources.map((resource) => {
                  const TypeIcon = getTypeIcon(resource.type)
                  return (
                    <div key={resource.id} className="p-4 rounded-lg border">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div
                            className={`w-12 h-12 rounded-lg flex items-center justify-center ${getTypeColor(resource.type)}`}
                          >
                            <TypeIcon className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-lg">{resource.title}</h3>
                              <Badge className={getTypeColor(resource.type)}>{resource.type}</Badge>
                              <Badge className={getStatusColor(resource.status)}>{resource.status}</Badge>
                            </div>
                            <p className="text-gray-600 mb-3">{resource.description}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>Category: {resource.category}</span>
                              <span>Size: {resource.fileSize}</span>
                              <span>Downloads: {resource.downloads}</span>
                              <span>Updated: {new Date(resource.updatedAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          {resource.status === "draft" && (
                            <Button size="sm" onClick={() => handlePublishResource(resource.id)}>
                              Publish
                            </Button>
                          )}
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDeleteResource(resource.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                })}
                {filteredResources.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    {searchQuery || selectedCategory !== "all"
                      ? "No resources match your search criteria."
                      : "No resources uploaded yet. Add your first resource to get started."}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="published">
          <Card>
            <CardHeader>
              <CardTitle>Published Resources</CardTitle>
              <CardDescription>Resources that are live and available to students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {publishedResources.map((resource) => {
                  const TypeIcon = getTypeIcon(resource.type)
                  return (
                    <div key={resource.id} className="p-4 rounded-lg border border-green-200 bg-green-50">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div
                            className={`w-12 h-12 rounded-lg flex items-center justify-center ${getTypeColor(resource.type)}`}
                          >
                            <TypeIcon className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-lg">{resource.title}</h3>
                              <Badge className={getTypeColor(resource.type)}>{resource.type}</Badge>
                            </div>
                            <p className="text-gray-600 mb-3">{resource.description}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>Category: {resource.category}</span>
                              <span>Downloads: {resource.downloads}</span>
                              <span>Published: {new Date(resource.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <Button size="sm" variant="outline">
                            View Analytics
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                })}
                {publishedResources.length === 0 && (
                  <div className="text-center py-8 text-gray-500">No published resources yet.</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drafts">
          <Card>
            <CardHeader>
              <CardTitle>Draft Resources</CardTitle>
              <CardDescription>Resources that are not yet published</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {draftResources.map((resource) => {
                  const TypeIcon = getTypeIcon(resource.type)
                  return (
                    <div key={resource.id} className="p-4 rounded-lg border border-yellow-200 bg-yellow-50">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div
                            className={`w-12 h-12 rounded-lg flex items-center justify-center ${getTypeColor(resource.type)}`}
                          >
                            <TypeIcon className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-lg">{resource.title}</h3>
                              <Badge className={getTypeColor(resource.type)}>{resource.type}</Badge>
                              <Badge className="bg-yellow-100 text-yellow-800">Draft</Badge>
                            </div>
                            <p className="text-gray-600 mb-3">{resource.description}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>Category: {resource.category}</span>
                              <span>Created: {new Date(resource.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <Button size="sm" onClick={() => handlePublishResource(resource.id)}>
                            Publish
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDeleteResource(resource.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                })}
                {draftResources.length === 0 && (
                  <div className="text-center py-8 text-gray-500">No draft resources.</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
