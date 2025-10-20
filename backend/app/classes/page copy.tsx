"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Badge } from "../components/ui/badge"
import { Plus, Search, Clock, Users, BookOpen, Star, Edit, Delete, View } from "lucide-react"
import Link from "next/link"
import { BottomNavigation } from "../components/navigation"

export default function ClassesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Mock data
  const categories = [
    { id: "all", name: "All", count: 12 },
    { id: "programming", name: "Programming", count: 5 },
    { id: "design", name: "Design", count: 3 },
    { id: "business", name: "Business", count: 2 },
    { id: "marketing", name: "Marketing", count: 2 },
  ]

  const myClasses = [
    {
      id: 1,
      title: "Advanced React Development",
      instructor: "Alex Johnson",
      students: 24,
      duration: "8 weeks",
      progress: 75,
      nextSession: "Today, 2:00 PM",
      category: "programming",
      rating: 4.8,
      isLive: true,
    },
    {
      id: 2,
      title: "UI/UX Design Fundamentals",
      instructor: "Sarah Chen",
      students: 18,
      duration: "6 weeks",
      progress: 45,
      nextSession: "Tomorrow, 10:00 AM",
      category: "design",
      rating: 4.9,
      isLive: false,
    },
  ]

  const availableClasses = [
    {
      id: 3,
      title: "Python for Data Science",
      instructor: "Mike Rodriguez",
      students: 32,
      duration: "10 weeks",
      price: "$199",
      category: "programming",
      rating: 4.7,
      thumbnail: "/python-programming-concept.png",
    },
    {
      id: 4,
      title: "Digital Marketing Strategy",
      instructor: "Emily Davis",
      students: 28,
      duration: "4 weeks",
      price: "$149",
      category: "marketing",
      rating: 4.6,
      thumbnail: "/digital-marketing-strategy.png",
    },
    {
      id: 5,
      title: "Business Analytics",
      instructor: "John Smith",
      students: 15,
      duration: "6 weeks",
      price: "$249",
      category: "business",
      rating: 4.8,
      thumbnail: "/business-analytics-concept.png",
    },
  ]

  const filteredClasses = availableClasses.filter((cls) =>
    selectedCategory === "all" ? true : cls.category === selectedCategory,
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-slate-800">Classes</h1>
          <p className="text-slate-600">Manage and discover learning opportunities</p>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/classes/create">
            <Card className="border-0 shadow-lg rounded-2xl bg-orange-500 text-white hover:bg-orange-600 transition-colors">
              <CardContent className="p-4 text-center">
                <Plus className="w-8 h-8 mx-auto mb-2" />
                <p className="font-semibold">Create Class</p>
              </CardContent>
            </Card>
          </Link>

                    <Link href="/classes/create">
            <Card className="border-0 shadow-lg rounded-2xl bg-yellow-500 text-white hover:bg-orange-600 transition-colors">
              <CardContent className="p-4 text-center">
                <Edit className="w-8 h-8 mx-auto mb-2" />
                <p className="font-semibold">Edit Class</p>
              </CardContent>
            </Card>
          </Link>
          
                    <Link href="/classes/create">
            <Card className="border-0 shadow-lg rounded-2xl bg-red-500 text-white hover:bg-orange-600 transition-colors">
              <CardContent className="p-4 text-center">
                <Delete className="w-8 h-8 mx-auto mb-2" />
                <p className="font-semibold">Delete Class</p>
              </CardContent>
            </Card>
          </Link>

                    <Link href="/classes/create">
            <Card className="border-0 shadow-lg rounded-2xl bg-blue-500 text-white hover:bg-orange-600 transition-colors">
              <CardContent className="p-4 text-center">
                <View className="w-8 h-8 mx-auto mb-2" />
                <p className="font-semibold">View Class</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            placeholder="Search classes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* My Classes */}
        <div>
          <h2 className="text-lg font-semibold text-slate-800 mb-4">My Classes</h2>
          <div className="space-y-3">
            {myClasses.map((cls) => (
              <Card key={cls.id} className="border-0 shadow-lg rounded-2xl">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-slate-800">{cls.title}</h3>
                        {cls.isLive && <Badge className="bg-red-500 text-white text-xs">LIVE</Badge>}
                      </div>
                      <p className="text-sm text-slate-600">by {cls.instructor}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{cls.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{cls.students} students</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{cls.duration}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">Progress</span>
                      <span className="font-medium">{cls.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all"
                        style={{ width: `${cls.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-600">Next: {cls.nextSession}</p>
                    <Link href={`/classes/${cls.id}`}>
                      <Button
                        className={`rounded-xl ${cls.isLive ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"}`}
                      >
                        {cls.isLive ? "Join Live" : "Continue"}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Browse by Category</h2>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`rounded-full whitespace-nowrap ${
                  selectedCategory === category.id
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-transparent hover:bg-slate-100"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name} ({category.count})
              </Button>
            ))}
          </div>
        </div>

        {/* Available Classes */}
        <div>
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Recommended for You</h2>
          <div className="space-y-3">
            {filteredClasses.map((cls) => (
              <Card key={cls.id} className="border-0 shadow-lg rounded-2xl">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-20 h-16 bg-slate-200 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={cls.thumbnail || "/placeholder.svg"}
                        alt={cls.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = "none"
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-slate-800 text-sm">{cls.title}</h3>
                          <p className="text-xs text-slate-600">by {cls.instructor}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-blue-600">{cls.price}</p>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            <span className="text-xs">{cls.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-600 mb-2">
                        <span>{cls.students} students</span>
                        <span>•</span>
                        <span>{cls.duration}</span>
                      </div>
                      <Link href={`/classes/${cls.id}`}>
                        <Button size="sm" className="w-full rounded-xl bg-green-500 hover:bg-green-600">
                          Enroll Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}
