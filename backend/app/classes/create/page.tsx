"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Switch } from "../../components/ui/switch"
import { ArrowLeft, Upload, Calendar, Clock, Users, DollarSign } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CreateClassPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    level: "",
    duration: "",
    maxStudents: "20",
    price: "",
    isFree: false,
    startDate: "",
    endDate: "",
    schedule: "weekly",
    sessionDuration: "60",
    prerequisites: "",
    learningOutcomes: "",
  })
  const [isCreating, setIsCreating] = useState(false)
  const router = useRouter()

  const categories = [
    "Programming",
    "Design",
    "Business",
    "Marketing",
    "Data Science",
    "Photography",
    "Music",
    "Language",
    "Other",
  ]

  const levels = ["Beginner", "Intermediate", "Advanced", "All Levels"]

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCreateClass = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCreating(true)

    // Simulate class creation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Redirect to classes page
    router.push("/classes")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center">
            <Link href="/classes">
              <Button variant="ghost" size="icon" className="mr-4">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Create Class</h1>
              <p className="text-slate-600">Share your knowledge with others</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6">
        <Card className="border-0 shadow-xl rounded-3xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-slate-800">Class Information</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleCreateClass} className="space-y-4">
              {/* Basic Information */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-slate-700 font-medium">
                    Class Title
                  </Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="Enter class title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="h-12 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-slate-700 font-medium">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what students will learn in this class"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className="rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-700 font-medium">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger className="h-12 rounded-xl border-slate-200">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category.toLowerCase()}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-700 font-medium">Level</Label>
                    <Select value={formData.level} onValueChange={(value) => handleInputChange("level", value)}>
                      <SelectTrigger className="h-12 rounded-xl border-slate-200">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        {levels.map((level) => (
                          <SelectItem key={level} value={level.toLowerCase()}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Class Details */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="font-semibold text-slate-800">Class Details</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration" className="text-slate-700 font-medium">
                      Duration (weeks)
                    </Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input
                        id="duration"
                        type="number"
                        placeholder="8"
                        value={formData.duration}
                        onChange={(e) => handleInputChange("duration", e.target.value)}
                        className="pl-10 h-12 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                        min="1"
                        max="52"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxStudents" className="text-slate-700 font-medium">
                      Max Students
                    </Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input
                        id="maxStudents"
                        type="number"
                        placeholder="20"
                        value={formData.maxStudents}
                        onChange={(e) => handleInputChange("maxStudents", e.target.value)}
                        className="pl-10 h-12 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                        min="1"
                        max="100"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate" className="text-slate-700 font-medium">
                      Start Date
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input
                        id="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => handleInputChange("startDate", e.target.value)}
                        className="pl-10 h-12 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sessionDuration" className="text-slate-700 font-medium">
                      Session (minutes)
                    </Label>
                    <Input
                      id="sessionDuration"
                      type="number"
                      placeholder="60"
                      value={formData.sessionDuration}
                      onChange={(e) => handleInputChange("sessionDuration", e.target.value)}
                      className="h-12 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                      min="30"
                      max="180"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="font-semibold text-slate-800">Pricing</h3>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-800">Free Class</p>
                    <p className="text-sm text-slate-600">Make this class available for free</p>
                  </div>
                  <Switch
                    checked={formData.isFree}
                    onCheckedChange={(checked) => handleInputChange("isFree", checked)}
                  />
                </div>

                {!formData.isFree && (
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-slate-700 font-medium">
                      Price ($)
                    </Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input
                        id="price"
                        type="number"
                        placeholder="99"
                        value={formData.price}
                        onChange={(e) => handleInputChange("price", e.target.value)}
                        className="pl-10 h-12 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                        min="1"
                        required={!formData.isFree}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Additional Information */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="font-semibold text-slate-800">Additional Information</h3>

                <div className="space-y-2">
                  <Label htmlFor="prerequisites" className="text-slate-700 font-medium">
                    Prerequisites (Optional)
                  </Label>
                  <Textarea
                    id="prerequisites"
                    placeholder="What should students know before taking this class?"
                    value={formData.prerequisites}
                    onChange={(e) => handleInputChange("prerequisites", e.target.value)}
                    className="rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="learningOutcomes" className="text-slate-700 font-medium">
                    Learning Outcomes
                  </Label>
                  <Textarea
                    id="learningOutcomes"
                    placeholder="What will students be able to do after completing this class?"
                    value={formData.learningOutcomes}
                    onChange={(e) => handleInputChange("learningOutcomes", e.target.value)}
                    className="rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                    rows={3}
                    required
                  />
                </div>
              </div>

              {/* Thumbnail Upload */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="font-semibold text-slate-800">Class Thumbnail</h3>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center">
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-slate-600 mb-2">Upload a class thumbnail</p>
                  <Button variant="outline" className="rounded-xl bg-transparent">
                    Choose File
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-lg font-semibold bg-orange-500 hover:bg-orange-600 text-white rounded-xl shadow-lg"
                disabled={isCreating}
              >
                {isCreating ? "Creating Class..." : "Create Class"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
