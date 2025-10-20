"use client"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Avatar, AvatarFallback } from "../../components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { ArrowLeft, Play, Clock, Users, Star, Calendar, CheckCircle, Circle, Download, Share } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function ClassDetailPage() {
  const params = useParams()
  const [enrollmentStatus, setEnrollmentStatus] = useState("not-enrolled") // not-enrolled, enrolled, completed

  // Mock data based on class ID
  const classData = {
    id: params.id,
    title: "Advanced React Development",
    instructor: {
      name: "Alex Johnson",
      avatar: "AJ",
      rating: 4.9,
      students: 1250,
      bio: "Senior Frontend Developer with 8+ years of experience in React and modern web technologies.",
    },
    description:
      "Master advanced React concepts including hooks, context, performance optimization, and modern patterns. Build real-world applications with industry best practices.",
    category: "Programming",
    level: "Advanced",
    duration: "8 weeks",
    totalHours: "24 hours",
    students: 156,
    rating: 4.8,
    reviews: 89,
    price: "$199",
    startDate: "March 15, 2024",
    schedule: "Tuesdays & Thursdays, 7:00 PM EST",
    progress: 65,
    nextSession: "Today, 7:00 PM",
    isLive: false,
    thumbnail: "/react-development-course.png",
  }

  const curriculum = [
    {
      week: 1,
      title: "Advanced Hooks & Custom Hooks",
      lessons: [
        { id: 1, title: "useReducer and Complex State", duration: "45 min", completed: true },
        { id: 2, title: "Custom Hooks Patterns", duration: "60 min", completed: true },
        { id: 3, title: "useCallback and useMemo", duration: "40 min", completed: true },
      ],
    },
    {
      week: 2,
      title: "Context API & State Management",
      lessons: [
        { id: 4, title: "Context API Deep Dive", duration: "50 min", completed: true },
        { id: 5, title: "State Management Patterns", duration: "55 min", completed: false },
        { id: 6, title: "Redux vs Context", duration: "45 min", completed: false },
      ],
    },
    {
      week: 3,
      title: "Performance Optimization",
      lessons: [
        { id: 7, title: "React.memo and PureComponent", duration: "40 min", completed: false },
        { id: 8, title: "Code Splitting & Lazy Loading", duration: "50 min", completed: false },
        { id: 9, title: "Bundle Analysis", duration: "35 min", completed: false },
      ],
    },
  ]

  const announcements = [
    {
      id: 1,
      title: "Assignment 3 Due Date Extended",
      content: "Due to popular request, the deadline for Assignment 3 has been extended to Friday.",
      date: "2 days ago",
    },
    {
      id: 2,
      title: "New Resource: React Performance Guide",
      content: "I've added a comprehensive performance optimization guide to the resources section.",
      date: "1 week ago",
    },
  ]

  const handleEnroll = () => {
    setEnrollmentStatus("enrolled")
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
            <div className="flex-1">
              <h1 className="text-lg font-bold text-slate-800 truncate">{classData.title}</h1>
              <p className="text-sm text-slate-600">by {classData.instructor.name}</p>
            </div>
            <Button variant="ghost" size="icon">
              <Share className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Class Hero */}
        <Card className="border-0 shadow-xl rounded-3xl overflow-hidden">
          <div className="aspect-video bg-slate-200 relative">
            <img
              src={classData.thumbnail || "/placeholder.svg"}
              alt={classData.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = "none"
              }}
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <Button size="icon" className="w-16 h-16 rounded-full bg-white/90 hover:bg-white text-slate-800">
                <Play className="w-8 h-8 ml-1" />
              </Button>
            </div>
            {classData.isLive && <Badge className="absolute top-4 left-4 bg-red-500 text-white">LIVE</Badge>}
          </div>

          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-blue-600 border-blue-200">
                  {classData.category}
                </Badge>
                <Badge variant="outline" className="text-orange-600 border-orange-200">
                  {classData.level}
                </Badge>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="font-medium">{classData.rating}</span>
                <span className="text-sm text-slate-600">({classData.reviews})</span>
              </div>
            </div>

            <p className="text-slate-700 text-sm leading-relaxed">{classData.description}</p>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-500" />
                <span>{classData.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-slate-500" />
                <span>{classData.students} students</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-500" />
                <span>{classData.startDate}</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-blue-600 text-lg">{classData.price}</span>
              </div>
            </div>

            {enrollmentStatus === "not-enrolled" ? (
              <Button
                onClick={handleEnroll}
                className="w-full h-12 text-lg font-semibold bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-lg"
              >
                Enroll Now
              </Button>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Progress</span>
                  <span className="font-medium">{classData.progress}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${classData.progress}%` }}
                  />
                </div>
                <Button className="w-full h-12 text-lg font-semibold bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-lg">
                  Continue Learning
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Instructor */}
        <Card className="border-0 shadow-lg rounded-2xl">
          <CardContent className="p-4">
            <h3 className="font-semibold text-slate-800 mb-3">Instructor</h3>
            <div className="flex items-start gap-3">
              <Avatar className="w-12 h-12">
                <AvatarFallback className="bg-blue-500 text-white font-bold">
                  {classData.instructor.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-800">{classData.instructor.name}</h4>
                <div className="flex items-center gap-3 text-sm text-slate-600 mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span>{classData.instructor.rating}</span>
                  </div>
                  <span>•</span>
                  <span>{classData.instructor.students} students</span>
                </div>
                <p className="text-sm text-slate-700">{classData.instructor.bio}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="curriculum" className="w-full">
          <TabsList className="grid w-full grid-cols-3 rounded-xl bg-slate-100">
            <TabsTrigger value="curriculum" className="rounded-lg">
              Curriculum
            </TabsTrigger>
            <TabsTrigger value="announcements" className="rounded-lg">
              Updates
            </TabsTrigger>
            <TabsTrigger value="resources" className="rounded-lg">
              Resources
            </TabsTrigger>
          </TabsList>

          <TabsContent value="curriculum" className="space-y-4">
            {curriculum.map((week) => (
              <Card key={week.week} className="border-0 shadow-lg rounded-2xl">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-slate-800 mb-3">
                    Week {week.week}: {week.title}
                  </h4>
                  <div className="space-y-2">
                    {week.lessons.map((lesson) => (
                      <div key={lesson.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50">
                        {lesson.completed ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-400" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-slate-800 text-sm">{lesson.title}</p>
                          <p className="text-xs text-slate-600">{lesson.duration}</p>
                        </div>
                        {enrollmentStatus !== "not-enrolled" && (
                          <Button size="sm" variant="ghost" className="rounded-lg">
                            <Play className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="announcements" className="space-y-4">
            {announcements.map((announcement) => (
              <Card key={announcement.id} className="border-0 shadow-lg rounded-2xl">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-slate-800">{announcement.title}</h4>
                    <span className="text-xs text-slate-500">{announcement.date}</span>
                  </div>
                  <p className="text-sm text-slate-700">{announcement.content}</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="resources" className="space-y-4">
            <Card className="border-0 shadow-lg rounded-2xl">
              <CardContent className="p-4">
                <h4 className="font-semibold text-slate-800 mb-3">Course Materials</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50">
                    <div>
                      <p className="font-medium text-slate-800 text-sm">React Hooks Cheat Sheet</p>
                      <p className="text-xs text-slate-600">PDF • 2.3 MB</p>
                    </div>
                    <Button size="sm" variant="ghost" className="rounded-lg">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50">
                    <div>
                      <p className="font-medium text-slate-800 text-sm">Project Starter Code</p>
                      <p className="text-xs text-slate-600">ZIP • 15.7 MB</p>
                    </div>
                    <Button size="sm" variant="ghost" className="rounded-lg">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
