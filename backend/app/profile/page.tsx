"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { Meeting, Schedule, Class, getMeetings, getSchedules, getClasses } from "../lib/utils"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { BottomNavigation } from "../components/navigation"
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
  Edit3,
  Camera,
  Globe,
  Calendar,
  Video,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const { user, isLoading: isAuthLoading } = useAuth();
  const [stats, setStats] = useState({
    meetingsCount: 0,
    classesCount: 0,
    schedulesCount: 0,
  });

  if (isAuthLoading) {
    return <div>Loading...</div>; // Or a proper loading spinner
  }

  if (!user) {
    // Redirect to login page if not authenticated
    window.location.href = '/login';
    return null; // Render nothing while redirecting
  }

  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch meetings
        const meetingsResponse = await getMeetings();
        const userMeetings = meetingsResponse.data.filter(m => m.user_id === user?.id);
        setMeetings(userMeetings);

        // Fetch schedules
        const schedulesResponse = await getSchedules();
        const userSchedules = schedulesResponse.data.filter(s => s.user_id === user?.id);
        setSchedules(userSchedules);

        // Fetch classes
        const classesResponse = await getClasses();
        const userClasses = classesResponse.data.filter(c => c.user_id === user?.id);
        setClasses(userClasses);

        // Update stats
        setStats({
          meetingsCount: userMeetings.length,
          classesCount: userClasses.length,
          schedulesCount: userSchedules.length,
        });

      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

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
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              <Button
                onClick={async () => {
                  localStorage.removeItem('token')
                  await fetch('http://localhost:8000/api/logout', {
                    method: 'POST',
                    headers: {
                      'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                  }).catch(() => {/* Ignore errors */})
                  window.location.href = '/login'
                }}
                variant="destructive"
                className="bg-red-500 hover:bg-red-600"
              >
                Logout
              </Button>
            </div>
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
                  <AvatarImage src={user?.avatar_url} />
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

            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-1">{user?.name}</h2>
              <p className="text-slate-600 mb-2">{user?.email}</p>
              <div className="flex items-center gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  <span>User ID: {user?.id}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Badge variant="outline" className="font-normal">
                    {user?.roles?.map(r => r.name).join(', ')}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="border-0 shadow-lg rounded-2xl">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mx-auto mb-2">
                <Video className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-slate-800">{stats.meetingsCount}</div>
              <div className="text-sm text-slate-600">Meetings</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg rounded-2xl">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mx-auto mb-2">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-slate-800">{stats.schedulesCount}</div>
              <div className="text-sm text-slate-600">Schedules</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg rounded-2xl">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-xl mx-auto mb-2">
                <BookOpen className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-slate-800">{stats.classesCount}</div>
              <div className="text-sm text-slate-600">Classes</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="meetings" className="w-full">
          <TabsList className="grid w-full grid-cols-3 rounded-xl bg-slate-100">
            <TabsTrigger value="meetings" className="rounded-lg">
              <Video className="w-4 h-4 mr-2" />
              Meetings
            </TabsTrigger>
            <TabsTrigger value="schedules" className="rounded-lg">
              <Calendar className="w-4 h-4 mr-2" />
              Schedules
            </TabsTrigger>
            <TabsTrigger value="classes" className="rounded-lg">
              <BookOpen className="w-4 h-4 mr-2" />
              Classes
            </TabsTrigger>
          </TabsList>

          {/* Meetings Tab */}
          <TabsContent value="meetings" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-800">Your Meetings</h3>
              <Badge variant="outline" className="text-blue-600 border-blue-200">
                {meetings.length} Total
              </Badge>
            </div>

            {meetings.map((meeting) => (
              <Card key={meeting.id} className="border-0 shadow-lg rounded-2xl">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-800 mb-1">{meeting.title}</h4>
                      {meeting.description && (
                        <p className="text-sm text-slate-600 mb-2">{meeting.description}</p>
                      )}
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{new Date(meeting.start_time).toLocaleDateString()} {new Date(meeting.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {meeting.meeting_link && (
                    <Button size="sm" variant="outline" className="w-full rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100">
                      <Video className="w-4 h-4 mr-2" />
                      Join Meeting
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Schedules Tab */}
          <TabsContent value="schedules" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-800">Your Schedules</h3>
              <Badge variant="outline" className="text-green-600 border-green-200">
                {schedules.length} Total
              </Badge>
            </div>

            {schedules.map((schedule) => (
              <Card key={schedule.id} className="border-0 shadow-lg rounded-2xl">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-slate-800">{schedule.event_title}</h4>
                        <Badge variant="outline" className={`${
                          schedule.type === 'meeting' ? 'text-blue-600 border-blue-200' : 'text-orange-600 border-orange-200'
                        }`}>
                          {schedule.type}
                        </Badge>
                      </div>
                      {schedule.description && (
                        <p className="text-sm text-slate-600 mb-2">{schedule.description}</p>
                      )}
                      <div className="space-y-1 text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(schedule.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{schedule.start_time} - {schedule.end_time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Classes Tab */}
          <TabsContent value="classes" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-800">Your Classes</h3>
              <Badge variant="outline" className="text-orange-600 border-orange-200">
                {classes.length} Total
              </Badge>
            </div>

            {classes.map((classItem) => (
              <Card key={classItem.id} className="border-0 shadow-lg rounded-2xl">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-800 mb-1">{classItem.name}</h4>
                      <p className="text-sm text-slate-600 mb-2">{classItem.description}</p>
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{classItem.instructor}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{classItem.schedule}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      <BottomNavigation />
    </div>
  )
}
