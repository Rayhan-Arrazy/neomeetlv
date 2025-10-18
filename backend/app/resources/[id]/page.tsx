"use client"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Avatar, AvatarFallback } from "../../components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { ArrowLeft, Play, Share, Star, Eye, Clock, ThumbsUp, Bookmark } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function ResourceDetailPage() {
  const params = useParams()
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [hasLiked, setHasLiked] = useState(false)

  // Mock data based on resource ID
  const resourceData = {
    id: params.id,
    title: "Explore Ancient Egypt",
    description:
      "Take an immersive virtual journey through the pyramids of Giza and discover the fascinating world of ancient Egyptian civilization. This interactive experience combines cutting-edge AR/VR technology with historical accuracy to bring the past to life.",
    category: "AR/VR",
    type: "interactive",
    duration: "45 min",
    rating: 4.9,
    reviews: 156,
    views: 1250,
    likes: 89,
    author: {
      name: "Dr. Sarah Mitchell",
      avatar: "SM",
      title: "Egyptologist & VR Developer",
      rating: 4.8,
    },
    thumbnail: "/ancient-egypt-vr-experience.png",
    isNew: true,
    tags: ["History", "Ancient Egypt", "Virtual Reality", "Educational", "Interactive"],
    learningObjectives: [
      "Understand the construction techniques of ancient pyramids",
      "Learn about Egyptian hieroglyphics and their meanings",
      "Explore the daily life of ancient Egyptians",
      "Discover the religious beliefs and burial practices",
    ],
    requirements: ["VR headset recommended (optional)", "Stable internet connection", "Modern web browser"],
  }

  const relatedResources = [
    {
      id: 2,
      title: "Ancient Rome Virtual Tour",
      category: "AR/VR",
      rating: 4.7,
      views: 890,
      thumbnail: "/ancient-rome-tour.png",
    },
    {
      id: 3,
      title: "Medieval Castle Experience",
      category: "AR/VR",
      rating: 4.6,
      views: 650,
      thumbnail: "/medieval-castle-experience.png",
    },
  ]

  const comments = [
    {
      id: 1,
      author: "Alex Johnson",
      avatar: "AJ",
      rating: 5,
      comment: "Absolutely incredible experience! The level of detail is amazing.",
      date: "2 days ago",
    },
    {
      id: 2,
      author: "Maria Garcia",
      avatar: "MG",
      rating: 5,
      comment: "My students loved this. Perfect for history classes.",
      date: "1 week ago",
    },
  ]

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const handleLike = () => {
    setHasLiked(!hasLiked)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/resources">
                <Button variant="ghost" size="icon" className="mr-4">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div className="flex-1">
                <h1 className="text-lg font-bold text-slate-800 truncate">{resourceData.title}</h1>
                <p className="text-sm text-slate-600">by {resourceData.author.name}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={handleBookmark}>
                <Bookmark className={`w-5 h-5 ${isBookmarked ? "fill-current text-blue-500" : ""}`} />
              </Button>
              <Button variant="ghost" size="icon">
                <Share className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Resource Hero */}
        <Card className="border-0 shadow-xl rounded-3xl overflow-hidden">
          <div className="aspect-video bg-slate-200 relative">
            <img
              src={resourceData.thumbnail || "/placeholder.svg"}
              alt={resourceData.title}
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
            {resourceData.isNew && <Badge className="absolute top-4 left-4 bg-green-500 text-white">NEW</Badge>}
            <div className="absolute top-4 right-4 flex items-center gap-2 text-white text-sm bg-black/50 px-2 py-1 rounded-lg">
              <Clock className="w-4 h-4" />
              <span>{resourceData.duration}</span>
            </div>
          </div>

          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-blue-600 border-blue-200">
                  {resourceData.category}
                </Badge>
                <Badge variant="outline" className="text-green-600 border-green-200">
                  {resourceData.type.toUpperCase()}
                </Badge>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="font-medium">{resourceData.rating}</span>
                <span className="text-sm text-slate-600">({resourceData.reviews})</span>
              </div>
            </div>

            <p className="text-slate-700 text-sm leading-relaxed">{resourceData.description}</p>

            <div className="grid grid-cols-3 gap-4 text-sm text-center">
              <div>
                <div className="font-bold text-slate-800">{resourceData.views.toLocaleString()}</div>
                <div className="text-slate-600">Views</div>
              </div>
              <div>
                <div className="font-bold text-slate-800">{resourceData.likes}</div>
                <div className="text-slate-600">Likes</div>
              </div>
              <div>
                <div className="font-bold text-slate-800">{resourceData.reviews}</div>
                <div className="text-slate-600">Reviews</div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1 h-12 text-lg font-semibold bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-lg">
                <Play className="w-5 h-5 mr-2" />
                Start Experience
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-xl bg-transparent"
                onClick={handleLike}
              >
                <ThumbsUp className={`w-5 h-5 ${hasLiked ? "fill-current text-blue-500" : ""}`} />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Author */}
        <Card className="border-0 shadow-lg rounded-2xl">
          <CardContent className="p-4">
            <h3 className="font-semibold text-slate-800 mb-3">Created by</h3>
            <div className="flex items-start gap-3">
              <Avatar className="w-12 h-12">
                <AvatarFallback className="bg-blue-500 text-white font-bold">
                  {resourceData.author.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-800">{resourceData.author.name}</h4>
                <p className="text-sm text-slate-600 mb-1">{resourceData.author.title}</p>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span className="text-sm">{resourceData.author.rating} rating</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tags */}
        <Card className="border-0 shadow-lg rounded-2xl">
          <CardContent className="p-4">
            <h3 className="font-semibold text-slate-800 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {resourceData.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-slate-600 border-slate-300">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 rounded-xl bg-slate-100">
            <TabsTrigger value="overview" className="rounded-lg">
              Overview
            </TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-lg">
              Reviews
            </TabsTrigger>
            <TabsTrigger value="related" className="rounded-lg">
              Related
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card className="border-0 shadow-lg rounded-2xl">
              <CardContent className="p-4">
                <h4 className="font-semibold text-slate-800 mb-3">Learning Objectives</h4>
                <ul className="space-y-2">
                  {resourceData.learningObjectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      {objective}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg rounded-2xl">
              <CardContent className="p-4">
                <h4 className="font-semibold text-slate-800 mb-3">Requirements</h4>
                <ul className="space-y-2">
                  {resourceData.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      {requirement}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-4">
            {comments.map((comment) => (
              <Card key={comment.id} className="border-0 shadow-lg rounded-2xl">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-slate-500 text-white text-sm">{comment.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-slate-800">{comment.author}</h5>
                        <span className="text-xs text-slate-500">{comment.date}</span>
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(comment.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-yellow-500 fill-current" />
                        ))}
                      </div>
                      <p className="text-sm text-slate-700">{comment.comment}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="related" className="space-y-4">
            {relatedResources.map((resource) => (
              <Card key={resource.id} className="border-0 shadow-lg rounded-2xl">
                <CardContent className="p-4">
                  <div className="flex gap-3">
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
                      <h4 className="font-semibold text-slate-800 text-sm mb-1">{resource.title}</h4>
                      <div className="flex items-center gap-3 text-xs text-slate-600 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {resource.category}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span>{resource.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span>{resource.views}</span>
                        </div>
                      </div>
                      <Link href={`/resources/${resource.id}`}>
                        <Button size="sm" className="w-full rounded-xl bg-blue-500 hover:bg-blue-600">
                          View Resource
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
