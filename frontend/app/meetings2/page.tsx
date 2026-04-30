"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Badge } from "../components/ui/badge"
import { Video, Plus, Clock, Users, Search, Settings } from "lucide-react"
import Link from "next/link"
import { BottomNavigation } from "../components/navigation"

export default function MeetingsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data
  const upcomingMeetings = [
    {
      id: 1,
      title: "Team Standup",
      time: "9:00 AM",
      duration: "30 min",
      participants: 8,
      type: "recurring",
      status: "starting-soon",
    },
    {
      id: 2,
      title: "Product Review",
      time: "2:00 PM",
      duration: "1 hour",
      participants: 12,
      type: "one-time",
      status: "scheduled",
    },
    {
      id: 3,
      title: "Client Presentation",
      time: "4:30 PM",
      duration: "45 min",
      participants: 6,
      type: "one-time",
      status: "scheduled",
    },
  ]

  const recentMeetings = [
    {
      id: 4,
      title: "Design Workshop",
      date: "Yesterday",
      duration: "2 hours",
      participants: 15,
      hasRecording: true,
    },
    {
      id: 5,
      title: "Sprint Planning",
      date: "2 days ago",
      duration: "1.5 hours",
      participants: 10,
      hasRecording: true,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-slate-800">Meetings</h1>
          <p className="text-slate-600">Manage your meetings and join sessions</p>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/meetings/join">
            <Card className="border-0 shadow-lg rounded-2xl bg-blue-500 text-white hover:bg-blue-600 transition-colors">
              <CardContent className="p-4 text-center">
                <Video className="w-8 h-8 mx-auto mb-2" />
                <p className="font-semibold">Join Meeting</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/meetings/create">
            <Card className="border-0 shadow-lg rounded-2xl bg-green-500 text-white hover:bg-green-600 transition-colors">
              <CardContent className="p-4 text-center">
                <Plus className="w-8 h-8 mx-auto mb-2" />
                <p className="font-semibold">New Meeting</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            placeholder="Search meetings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Upcoming Meetings */}
        <div>
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Upcoming</h2>
          <div className="space-y-3">
            {upcomingMeetings.map((meeting) => (
              <Card key={meeting.id} className="border-0 shadow-lg rounded-2xl">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-slate-800">{meeting.title}</h3>
                    {meeting.status === "starting-soon" && (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Starting Soon</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>
                        {meeting.time} • {meeting.duration}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{meeting.participants} participants</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/meetings/${meeting.id}`} className="flex-1">
                      <Button
                        className={`w-full rounded-xl ${
                          meeting.status === "starting-soon"
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-blue-500 hover:bg-blue-600"
                        }`}
                      >
                        {meeting.status === "starting-soon" ? "Join Now" : "Join Meeting"}
                      </Button>
                    </Link>
                    <Button variant="outline" size="icon" className="rounded-xl bg-transparent">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Meetings */}
        <div>
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Recent</h2>
          <div className="space-y-3">
            {recentMeetings.map((meeting) => (
              <Card key={meeting.id} className="border-0 shadow-lg rounded-2xl">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-slate-800">{meeting.title}</h3>
                    {meeting.hasRecording && (
                      <Badge variant="outline" className="text-blue-600 border-blue-200">
                        Recorded
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                    <span>{meeting.date}</span>
                    <span>•</span>
                    <span>{meeting.duration}</span>
                    <span>•</span>
                    <span>{meeting.participants} participants</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 rounded-xl bg-transparent">
                      View Details
                    </Button>
                    {meeting.hasRecording && (
                      <Button variant="outline" className="flex-1 rounded-xl bg-transparent">
                        Watch Recording
                      </Button>
                    )}
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
