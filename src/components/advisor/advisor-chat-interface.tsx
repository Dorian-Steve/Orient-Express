"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Search, MoreVertical, Phone, Video } from "lucide-react"

// Mock data for chat conversations
const conversations = [
  {
    id: "1",
    studentId: "1",
    studentName: "John Doe",
    studentAvatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thank you for the career guidance session!",
    lastMessageTime: "2024-01-15T14:30:00Z",
    unreadCount: 0,
    isOnline: true,
  },
  {
    id: "2",
    studentId: "2",
    studentName: "Marie Kouam",
    studentAvatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Could we schedule a follow-up meeting?",
    lastMessageTime: "2024-01-15T12:15:00Z",
    unreadCount: 2,
    isOnline: false,
  },
  {
    id: "3",
    studentId: "3",
    studentName: "Alex Johnson",
    studentAvatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "I've completed my profile as requested",
    lastMessageTime: "2024-01-14T16:45:00Z",
    unreadCount: 1,
    isOnline: true,
  },
]

const messages = [
  {
    id: "1",
    senderId: "2",
    senderName: "Marie Kouam",
    content: "Hello Dr. Mbarga, I hope you're doing well.",
    timestamp: "2024-01-15T10:00:00Z",
    isFromAdvisor: false,
  },
  {
    id: "2",
    senderId: "advisor",
    senderName: "Dr. Jean Mbarga",
    content: "Hello Marie! I'm doing well, thank you. How can I help you today?",
    timestamp: "2024-01-15T10:05:00Z",
    isFromAdvisor: true,
  },
  {
    id: "3",
    senderId: "2",
    senderName: "Marie Kouam",
    content: "I wanted to discuss my performance in the Data Structures course. I'm finding some concepts challenging.",
    timestamp: "2024-01-15T10:10:00Z",
    isFromAdvisor: false,
  },
  {
    id: "4",
    senderId: "advisor",
    senderName: "Dr. Jean Mbarga",
    content:
      "I understand. Data Structures can be challenging initially. Let's schedule a meeting to go through the concepts you're struggling with. What specific topics are giving you trouble?",
    timestamp: "2024-01-15T10:15:00Z",
    isFromAdvisor: true,
  },
  {
    id: "5",
    senderId: "2",
    senderName: "Marie Kouam",
    content: "Mainly binary trees and graph algorithms. Could we schedule a follow-up meeting?",
    timestamp: "2024-01-15T12:15:00Z",
    isFromAdvisor: false,
  },
]

export function AdvisorChatInterface() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[1])
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredConversations = conversations.filter((conv) =>
    conv.studentName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    // In a real app, this would send the message via API
    console.log("Sending message:", newMessage)
    setNewMessage("")
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    } else {
      return date.toLocaleDateString()
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
      {/* Conversations List */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Messages</CardTitle>
          <CardDescription>Chat with your assigned students</CardDescription>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[400px]">
            <div className="space-y-1 p-4">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedConversation.id === conversation.id
                      ? "bg-blue-50 border border-blue-200"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={conversation.studentAvatar || "/placeholder.svg"}
                          alt={conversation.studentName}
                        />
                        <AvatarFallback>{conversation.studentName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {conversation.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm truncate">{conversation.studentName}</p>
                        <div className="flex items-center gap-1">
                          {conversation.unreadCount > 0 && (
                            <Badge variant="destructive" className="text-xs px-1.5 py-0.5">
                              {conversation.unreadCount}
                            </Badge>
                          )}
                          <span className="text-xs text-muted-foreground">
                            {formatTime(conversation.lastMessageTime)}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground truncate mt-1">{conversation.lastMessage}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card className="lg:col-span-2">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={selectedConversation.studentAvatar || "/placeholder.svg"}
                    alt={selectedConversation.studentName}
                  />
                  <AvatarFallback>{selectedConversation.studentName.charAt(0)}</AvatarFallback>
                </Avatar>
                {selectedConversation.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                )}
              </div>
              <div>
                <h3 className="font-semibold">{selectedConversation.studentName}</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedConversation.isOnline ? "Online" : "Last seen recently"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Video className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {/* Messages */}
          <ScrollArea className="h-[400px] p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isFromAdvisor ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      message.isFromAdvisor ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${message.isFromAdvisor ? "text-blue-100" : "text-gray-500"}`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="border-t p-4">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
