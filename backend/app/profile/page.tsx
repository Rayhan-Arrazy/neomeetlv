"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Switch } from "../components/ui/switch"
import {
  ArrowLeft,
  Settings,
  User,
  BookOpen,
  Eye,
  Edit3,
  Camera,
  Bell,
  Shield,
  Globe,
  Calendar,
  Award,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Ferry Johnson",
    email: "ferry.johnson@neomeet.com",
    title: "Senior Product Manager",
    company: "TechCorp Inc.",
    bio: "Passionate about creating innovative educational experiences through technology. Love connecting with learners worldwide.",
    location: "San Francisco, CA",
    timezone: "PST (UTC-8)",
    joinDate: "January 2024",
  })

  const [notifications, setNotifications] = useState({
    meetings: true,
    classes: true,
    assignments: false,
    marketing: false,
  })

  const stats = {
    meetingsAttended: 47,
    classesCompleted: 12,
    assignmentsSubmitted: 28,
    totalHours: 156,
  }

  const recentAssignments = [
    {
      id: 1,
      title: "Digital Marketing Strategy Analysis",
      course: "Advanced Marketing",
      dueDate: "Dec 28, 2024",
      status: "completed",
      score: 95,
    },
    {
      id: 2,
      title: "React Component Architecture",
      course: "Frontend Development",
      dueDate: "Jan 5, 2025",
      status: "pending",
      score: null,
    },
    {
      id: 3,
      title: "Business Analytics Report",
      course: "Data Science Fundamentals",
      dueDate: "Jan 12, 2025",
      status: "in-progress",
      score: null,
    },
  ]

  const arvrExperiences = [
    {
      id: 1,
      title: "Ancient Egypt Exploration",
      category: "History",
      completedAt: "2 days ago",
      rating: 5,
      duration: "45 min",
    },
    {
      id: 2,
      title: "Solar System Journey",
      category: "Science",
      completedAt: "1 week ago",
      rating: 4,
      duration: "30 min",
    },
    {
      id: 3,
      title: "Medieval Castle Tour",
      category: "History",
      completedAt: "2 weeks ago",
      rating: 5,
      duration: "35 min",
    },
  ]

  const handleSaveProfile = () => {
    setIsEditing(false)
    // Here you would typically save to backend
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      case "pending":
        return <Clock className="w-4 h-4" />
      case "in-progress":
        return <AlertCircle className="w-4 h-4" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/dashboard">
                <Button variant="ghost" size="icon" className="mr-4">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <h1 className="text-lg font-bold text-slate-800">Profile</h1>
            </div>
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Profile Header */}
        <Card className="border-0 shadow-xl rounded-3xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-24"></div>
          <CardContent className="p-6 -mt-12 relative">
            <div className="flex items-end justify-between mb-4">
              <div className="relative">
                <Avatar className="w-20 h-20 border-4 border-white shadow-lg">
                  <AvatarImage src="/professional-headshot.png" />
                  <AvatarFallback className="bg-blue-500 text-white text-xl font-bold">FJ</AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white border-2 border-white shadow-lg hover:bg-gray-50"
                >
                  <Camera className="w-4 h-4 text-gray-600" />
                </Button>
              </div>
              <Button
                variant={isEditing ? "default" : "outline"}
                size="sm"
                className="rounded-xl"
                onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
              >
                {isEditing ? (
                  "Save"
                ) : (
                  <>
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit
                  </>
                )}
              </Button>
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    value={profileData.title}
                    onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    className="rounded-xl"
                    rows={3}
                  />
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-bold text-slate-800 mb-1">{profileData.name}</h2>
                <p className="text-slate-600 mb-2">{profileData.title}</p>
                <p className="text-sm text-slate-700 mb-3">{profileData.bio}</p>
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <div className="flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    <span>{profileData.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {profileData.joinDate}</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-0 shadow-lg rounded-2xl">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mx-auto mb-2">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-slate-800">{stats.meetingsAttended}</div>
              <div className="text-sm text-slate-600">Meetings</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg rounded-2xl">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mx-auto mb-2">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-slate-800">{stats.classesCompleted}</div>
              <div className="text-sm text-slate-600">Classes</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3 rounded-xl bg-slate-100">
            <TabsTrigger value="details" className="rounded-lg">
              <User className="w-4 h-4 mr-2" />
              Details
            </TabsTrigger>
            <TabsTrigger value="assignments" className="rounded-lg">
              <BookOpen className="w-4 h-4 mr-2" />
              Work
            </TabsTrigger>
            <TabsTrigger value="arvr" className="rounded-lg">
              <Eye className="w-4 h-4 mr-2" />
              AR/VR
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            {/* Personal Information */}
            <Card className="border-0 shadow-lg rounded-2xl">
              <CardContent className="p-4">
                <h3 className="font-semibold text-slate-800 mb-4">Personal Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Email</span>
                    <span className="text-slate-800 font-medium">{profileData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Company</span>
                    <span className="text-slate-800 font-medium">{profileData.company}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Timezone</span>
                    <span className="text-slate-800 font-medium">{profileData.timezone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Total Hours</span>
                    <span className="text-slate-800 font-medium">{stats.totalHours}h</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="border-0 shadow-lg rounded-2xl">
              <CardContent className="p-4">
                <h3 className="font-semibold text-slate-800 mb-4 flex items-center">
                  <Bell className="w-5 h-5 mr-2" />
                  Notifications
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-slate-800">Meeting Reminders</div>
                      <div className="text-sm text-slate-600">Get notified before meetings</div>
                    </div>
                    <Switch
                      checked={notifications.meetings}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, meetings: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-slate-800">Class Updates</div>
                      <div className="text-sm text-slate-600">New classes and announcements</div>
                    </div>
                    <Switch
                      checked={notifications.classes}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, classes: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-slate-800">Assignment Due</div>
                      <div className="text-sm text-slate-600">Assignment deadlines</div>
                    </div>
                    <Switch
                      checked={notifications.assignments}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, assignments: checked })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card className="border-0 shadow-lg rounded-2xl">
              <CardContent className="p-4">
                <h3 className="font-semibold text-slate-800 mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Privacy & Security
                </h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start rounded-xl bg-transparent">
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start rounded-xl bg-transparent">
                    Two-Factor Authentication
                  </Button>
                  <Button variant="outline" className="w-full justify-start rounded-xl bg-transparent">
                    Download My Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assignments" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-800">Recent Assignments</h3>
              <Badge variant="outline" className="text-blue-600 border-blue-200">
                {stats.assignmentsSubmitted} Total
              </Badge>
            </div>

            {recentAssignments.map((assignment) => (
              <Card key={assignment.id} className="border-0 shadow-lg rounded-2xl">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-800 mb-1">{assignment.title}</h4>
                      <p className="text-sm text-slate-600 mb-2">{assignment.course}</p>
                      <div className="flex items-center gap-2">
                        <Badge className={`text-xs ${getStatusColor(assignment.status)}`}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(assignment.status)}
                            {assignment.status.replace("-", " ")}
                          </div>
                        </Badge>
                        {assignment.score && (
                          <Badge variant="outline" className="text-green-600 border-green-200">
                            {assignment.score}%
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Due: {assignment.dueDate}</span>
                    <Button size="sm" variant="outline" className="rounded-xl bg-transparent">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="arvr" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-800">AR/VR Experiences</h3>
              <Badge variant="outline" className="text-purple-600 border-purple-200">
                {arvrExperiences.length} Completed
              </Badge>
            </div>

            {arvrExperiences.map((experience) => (
              <Card key={experience.id} className="border-0 shadow-lg rounded-2xl">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-800 mb-1">{experience.title}</h4>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-purple-600 border-purple-200">
                          {experience.category}
                        </Badge>
                        <div className="flex items-center gap-1">
                          {[...Array(experience.rating)].map((_, i) => (
                            <div key={i} className="w-3 h-3 bg-yellow-400 rounded-full" />
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <span>{experience.duration}</span>
                        <span>Completed {experience.completedAt}</span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="w-full rounded-xl bg-transparent">
                    Experience Again
                  </Button>
                </CardContent>
              </Card>
            ))}

            <Card className="border-0 shadow-lg rounded-2xl border-dashed border-slate-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Eye className="w-8 h-8 text-slate-400" />
                </div>
                <h4 className="font-semibold text-slate-800 mb-2">Discover More Experiences</h4>
                <p className="text-sm text-slate-600 mb-4">
                  Explore our library of immersive AR/VR educational content
                </p>
                <Link href="/resources">
                  <Button className="rounded-xl bg-purple-500 hover:bg-purple-600">Browse AR/VR Library</Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
