"use client"

import { useState, useEffect } from "react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent } from "../../../components/ui/card"
import { Avatar, AvatarFallback } from "../../../components/ui/avatar"
import { Badge } from "../../../components/ui/badge"
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Phone,
  Settings,
  Users,
  MessageSquare,
  Share,
  MoreVertical,
  Bot,
  FileText,
} from "lucide-react"
import { useParams, useRouter } from "next/navigation"

export default function MeetingRoomPage() {
  const params = useParams()
  const router = useRouter()
  const [isMicOn, setIsMicOn] = useState(true)
  const [isCameraOn, setIsCameraOn] = useState(true)
  const [showParticipants, setShowParticipants] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [meetingDuration, setMeetingDuration] = useState(0)
  const [aiAssistantActive, setAiAssistantActive] = useState(true)

  // Mock data
  const meetingTitle = "Team Standup Meeting"
  const participants = [
    { id: 1, name: "Alex Johnson", avatar: "AJ", isMuted: false, isHost: true },
    { id: 2, name: "Sarah Chen", avatar: "SC", isMuted: true, isHost: false },
    { id: 3, name: "Mike Rodriguez", avatar: "MR", isMuted: false, isHost: false },
    { id: 4, name: "Emily Davis", avatar: "ED", isMuted: true, isHost: false },
  ]

  const aiInsights = [
    "📝 Action item: Alex to review the design mockups by Friday",
    "🎯 Key decision: Moving forward with the new API architecture",
    "⏰ Next meeting scheduled for Thursday at 2 PM",
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setMeetingDuration((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleEndMeeting = () => {
    router.push("/meetings")
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="bg-slate-800 px-4 py-3 flex items-center justify-between">
        <div>
          <h1 className="font-semibold">{meetingTitle}</h1>
          <p className="text-sm text-slate-400">{formatDuration(meetingDuration)}</p>
        </div>
        <div className="flex items-center gap-2">
          {aiAssistantActive && (
            <Badge className="bg-green-500 text-white">
              <Bot className="w-3 h-3 mr-1" />
              AI Assistant
            </Badge>
          )}
          <Button variant="ghost" size="icon" onClick={() => setShowParticipants(!showParticipants)}>
            <Users className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        {/* Video Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {participants.map((participant) => (
            <Card key={participant.id} className="bg-slate-800 border-slate-700 rounded-2xl overflow-hidden">
              <CardContent className="p-0 aspect-video relative">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="bg-white text-slate-800 text-lg font-bold">
                      {participant.avatar}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="absolute bottom-2 left-2 flex items-center gap-2">
                  <span className="text-sm font-medium">{participant.name}</span>
                  {participant.isHost && <Badge className="bg-orange-500 text-xs">Host</Badge>}
                </div>
                <div className="absolute bottom-2 right-2">
                  {participant.isMuted ? (
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                      <MicOff className="w-3 h-3" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Mic className="w-3 h-3" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Assistant Panel */}
        {aiAssistantActive && (
          <Card className="bg-slate-800 border-slate-700 rounded-2xl mb-4">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Bot className="w-5 h-5 text-green-400" />
                <h3 className="font-semibold text-green-400">AI Meeting Assistant</h3>
              </div>
              <div className="space-y-2">
                {aiInsights.map((insight, index) => (
                  <p key={index} className="text-sm text-slate-300">
                    {insight}
                  </p>
                ))}
              </div>
              <div className="flex gap-2 mt-3">
                <Button variant="outline" size="sm" className="text-xs bg-transparent">
                  <FileText className="w-3 h-3 mr-1" />
                  Generate Summary
                </Button>
                <Button variant="outline" size="sm" className="text-xs bg-transparent">
                  Export Notes
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Controls */}
      <div className="bg-slate-800 px-4 py-4">
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full w-12 h-12 ${isMicOn ? "bg-slate-700" : "bg-red-500"}`}
            onClick={() => setIsMicOn(!isMicOn)}
          >
            {isMicOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full w-12 h-12 ${isCameraOn ? "bg-slate-700" : "bg-red-500"}`}
            onClick={() => setIsCameraOn(!isCameraOn)}
          >
            {isCameraOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
          </Button>

          <Button variant="ghost" size="icon" className="rounded-full w-12 h-12 bg-slate-700">
            <Share className="w-6 h-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full w-12 h-12 bg-slate-700"
            onClick={() => setShowChat(!showChat)}
          >
            <MessageSquare className="w-6 h-6" />
          </Button>

          <Button variant="ghost" size="icon" className="rounded-full w-12 h-12 bg-slate-700">
            <Settings className="w-6 h-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full w-12 h-12 bg-red-500 hover:bg-red-600"
            onClick={handleEndMeeting}
          >
            <Phone className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Participants Sidebar */}
      {showParticipants && (
        <div className="fixed right-0 top-0 h-full w-80 bg-slate-800 border-l border-slate-700 p-4">
          <h3 className="font-semibold mb-4">Participants ({participants.length})</h3>
          <div className="space-y-3">
            {participants.map((participant) => (
              <div key={participant.id} className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-blue-500 text-white">{participant.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">{participant.name}</p>
                  {participant.isHost && <Badge className="bg-orange-500 text-xs">Host</Badge>}
                </div>
                {participant.isMuted ? (
                  <MicOff className="w-4 h-4 text-red-400" />
                ) : (
                  <Mic className="w-4 h-4 text-green-400" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
