"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Calendar, Clock, Users, Bot } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CreateMeetingPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    duration: "30",
    maxParticipants: "10",
    enableAI: true,
    enableRecording: true,
    requirePassword: false,
    password: "",
  })
  const [isCreating, setIsCreating] = useState(false)
  const router = useRouter()

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCreateMeeting = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCreating(true)

    // Simulate meeting creation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Redirect to meetings page
    router.push("/meetings")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center">
            <Link href="/meetings">
              <Button variant="ghost" size="icon" className="mr-4">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Create Meeting</h1>
              <p className="text-slate-600">Schedule a new meeting</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4">
        <Card className="border-0 shadow-xl rounded-3xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-slate-800">Meeting Details</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleCreateMeeting} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-slate-700 font-medium">
                  Meeting Title
                </Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter meeting title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="h-12 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-slate-700 font-medium">
                  Description (Optional)
                </Label>
                <Textarea
                  id="description"
                  placeholder="Meeting agenda or description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-slate-700 font-medium">
                    Date
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange("date", e.target.value)}
                      className="pl-10 h-12 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time" className="text-slate-700 font-medium">
                    Time
                  </Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => handleInputChange("time", e.target.value)}
                      className="pl-10 h-12 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration" className="text-slate-700 font-medium">
                    Duration (minutes)
                  </Label>
                  <Input
                    id="duration"
                    type="number"
                    placeholder="30"
                    value={formData.duration}
                    onChange={(e) => handleInputChange("duration", e.target.value)}
                    className="h-12 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                    min="15"
                    max="480"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxParticipants" className="text-slate-700 font-medium">
                    Max Participants
                  </Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      id="maxParticipants"
                      type="number"
                      placeholder="10"
                      value={formData.maxParticipants}
                      onChange={(e) => handleInputChange("maxParticipants", e.target.value)}
                      className="pl-10 h-12 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                      min="2"
                      max="100"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Meeting Options */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="font-semibold text-slate-800">Meeting Options</h3>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bot className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="font-medium text-slate-800">AI Assistant</p>
                      <p className="text-sm text-slate-600">Enable meeting transcription and insights</p>
                    </div>
                  </div>
                  <Switch
                    checked={formData.enableAI}
                    onCheckedChange={(checked) => handleInputChange("enableAI", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-800">Recording</p>
                    <p className="text-sm text-slate-600">Automatically record the meeting</p>
                  </div>
                  <Switch
                    checked={formData.enableRecording}
                    onCheckedChange={(checked) => handleInputChange("enableRecording", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-800">Password Protection</p>
                    <p className="text-sm text-slate-600">Require password to join</p>
                  </div>
                  <Switch
                    checked={formData.requirePassword}
                    onCheckedChange={(checked) => handleInputChange("requirePassword", checked)}
                  />
                </div>

                {formData.requirePassword && (
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-slate-700 font-medium">
                      Meeting Password
                    </Label>
                    <Input
                      id="password"
                      type="text"
                      placeholder="Enter meeting password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className="h-12 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-lg font-semibold bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-lg"
                disabled={isCreating}
              >
                {isCreating ? "Creating Meeting..." : "Create Meeting"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
