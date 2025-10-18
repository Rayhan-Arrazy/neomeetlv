"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Badge } from "../components/ui/badge"
import { Search, BookOpen, Video, FileText, Download, Star, Clock, Eye } from "lucide-react"
import Link from "next/link"
import { BottomNavigation } from "../components/navigation"

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Mock data
  const categories = [
    { id: "all", name: "All", count: 24 },
    { id: "ar-vr", name: "AR/VR", count: 8 },
    { id: "programming", name: "Programming", count: 6 },
    { id: "design", name: "Design", count: 5 },
    { id: "business", name: "Business", count: 3 },
    { id: "science", name: "Science", count: 2 },
  ]

  const featuredResources = [
    {
      id: 1,
      title: "Explore Ancient Egypt",
      description: "Take a virtual journey through the pyramids and discover ancient Egyptian civilization",
      category: "ar-vr",
      type: "interactive",
      duration: "45 min",
      rating: 4.9,
      views: 1250,
      thumbnail: "/ancient-egypt-vr-experience.png",
      isNew: true,
    },
    {
      id: 2,
      title: "Ocean Depths Discovery",
      description: "Dive deep into the ocean and explore marine life in this immersive experience",
      category: "ar-vr",
      type: "interactive",
      duration: "30 min",
      rating: 4.8,
      views: 980,
      thumbnail: "/ocean-depths-exploration.png",
      isNew: false,
    },
    {
      id: 3,
      title: "Solar System Journey",
      description: "Travel through space and learn about planets, stars, and cosmic phenomena",
      category: "science",
      type: "interactive",
      duration: "60 min",
      rating: 4.7,
      views: 2100,
      thumbnail: "/solar-system-journey.png",
      isNew: true,
    },
  ]

  const resources = [
    {
      id: 4,
      title: "React Hooks Complete Guide",
      description: "Comprehensive guide to React Hooks with practical examples",
      category: "programming",
      type: "document",
      size: "2.3 MB",
      downloads: 1500,
      rating: 4.8,
      thumbnail: "/react-hooks-guide.png",
    },
    {
      id: 5,
      title: "UI/UX Design Principles",
      description: "Essential design principles for creating user-friendly interfaces",
      category: "design",
      type: "video",
      duration: "25 min",
      views: 850,
      rating: 4.6,
      thumbnail: "/ui-ux-design-principles.png",
    },
    {
      id: 6,
      title: "Business Strategy Framework",
      description: "Strategic planning tools and frameworks for business growth",
      category: "business",
      type: "document",
      size: "1.8 MB",
      downloads: 650,
      rating: 4.7,
      thumbnail: "/business-strategy-framework.png",
    },
    {
      id: 7,
      title: "JavaScript ES6+ Features",
      description: "Modern JavaScript features and best practices",
      category: "programming",
      type: "video",
      duration: "40 min",
      views: 1200,
      rating: 4.9,
      thumbnail: "/javascript-es6-features.png",
    },
    {
      id: 8,
      title: "Color Theory in Design",
      description: "Understanding color psychology and application in design",
      category: "design",
      type: "interactive",
      duration: "35 min",
      views: 720,
      rating: 4.5,
      thumbnail: "/color-theory-design.png",
    },
  ]

  const filteredResources = resources.filter((resource) =>
    selectedCategory === "all" ? true : resource.category === selectedCategory,
  )

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="w-4 h-4" />
      case "document":
        return <FileText className="w-4 h-4" />
      case "interactive":
        return <BookOpen className="w-4 h-4" />
      default:
        return <BookOpen className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "video":
        return "bg-red-100 text-red-700"
      case "document":
        return "bg-blue-100 text-blue-700"
      case "interactive":
        return "bg-green-100 text-green-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-slate-800">Resources</h1>
          <p className="text-slate-600">Explore learning materials and interactive content</p>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Categories */}
        <div>
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Categories</h2>
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

        {/* Featured Resources */}
        <div>
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Featured Experiences</h2>
          <div className="space-y-4">
            {featuredResources.map((resource) => (
              <Card key={resource.id} className="border-0 shadow-lg rounded-2xl overflow-hidden">
                <div className="aspect-video bg-slate-200 relative">
                  <img
                    src={resource.thumbnail || "/placeholder.svg"}
                    alt={resource.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = "none"
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 mb-2">
                      {resource.isNew && <Badge className="bg-green-500 text-white text-xs">NEW</Badge>}
                      <Badge className={`text-xs ${getTypeColor(resource.type)}`}>{resource.type.toUpperCase()}</Badge>
                    </div>
                    <h3 className="font-bold text-white text-lg mb-1">{resource.title}</h3>
                    <p className="text-white/90 text-sm">{resource.description}</p>
                  </div>
                  <div className="absolute top-4 right-4 flex items-center gap-2 text-white text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{resource.duration}</span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span>{resource.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{resource.views.toLocaleString()}</span>
                      </div>
                    </div>
                    <Link href={`/resources/${resource.id}`}>
                      <Button className="rounded-xl bg-blue-500 hover:bg-blue-600">Explore</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Resources */}
        <div>
          <h2 className="text-lg font-semibold text-slate-800 mb-4">All Resources</h2>
          <div className="space-y-3">
            {filteredResources.map((resource) => (
              <Card key={resource.id} className="border-0 shadow-lg rounded-2xl">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 bg-slate-200 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={resource.thumbnail || "/placeholder.svg"}
                        alt={resource.title}
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
                          <h3 className="font-semibold text-slate-800 text-sm">{resource.title}</h3>
                          <p className="text-xs text-slate-600 line-clamp-2">{resource.description}</p>
                        </div>
                        <Badge className={`text-xs ${getTypeColor(resource.type)} ml-2`}>
                          {getTypeIcon(resource.type)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-600 mb-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span>{resource.rating}</span>
                        </div>
                        {resource.type === "document" ? (
                          <>
                            <span>•</span>
                            <span>{resource.size}</span>
                            <span>•</span>
                            <span>{resource.downloads} downloads</span>
                          </>
                        ) : (
                          <>
                            <span>•</span>
                            <span>{resource.duration || `${resource.views} views`}</span>
                          </>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/resources/${resource.id}`} className="flex-1">
                          <Button size="sm" className="w-full rounded-xl bg-blue-500 hover:bg-blue-600">
                            {resource.type === "document" ? "Download" : "View"}
                          </Button>
                        </Link>
                        {resource.type === "document" && (
                          <Button size="sm" variant="outline" className="rounded-xl bg-transparent">
                            <Download className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="border-0 shadow-lg rounded-2xl">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">24</div>
              <p className="text-xs text-slate-600">Total Resources</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg rounded-2xl">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">8</div>
              <p className="text-xs text-slate-600">AR/VR Experiences</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg rounded-2xl">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">12</div>
              <p className="text-xs text-slate-600">New This Week</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}
