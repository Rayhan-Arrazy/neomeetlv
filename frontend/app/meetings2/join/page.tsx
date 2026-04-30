"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Video, Mic, MicOff, VideoOff, Settings } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function JoinMeetingPage() {
  const [meetingId, setMeetingId] = useState("")
  const [displayName, setDisplayName] = useState("Alex Johnson")
  const [isMicOn, setIsMicOn] = useState(true)
  const [isCameraOn, setIsCameraOn] = useState(true)
  const [isJoining, setIsJoining] = useState(false)
  const router = useRouter()

  const handleJoinMeeting = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsJoining(true)

    // Simulate joining process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Redirect to meeting room
    router.push(`/meetings/room/${meetingId || "demo-meeting"}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/meetings">
            <Button variant="ghost" size="icon" className="mr-4">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
              <span className="text-white text-lg font-bold">N</span>
            </div>
            <span className="ml-2 text-xl font-bold text-slate-800">NeoMeet</span>
          </div>
        </div>

        <Card className="border-0 shadow-xl rounded-3xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-slate-800">Join Meeting</CardTitle>
            <p className="text-slate-600">Enter meeting details to join</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Camera Preview */}
            <div className="relative bg-slate-900 rounded-2xl aspect-video overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                {isCameraOn ? (
                  <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">AJ</span>
                  </div>
                ) : (
                  <div className="text-white text-center">
                    <VideoOff className="w-12 h-12 mx-auto mb-2" />
                    <p>Camera is off</p>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-full ${isMicOn ? "bg-slate-700 text-white" : "bg-red-500 text-white"}`}
                  onClick={() => setIsMicOn(!isMicOn)}
                >
                  {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-full ${isCameraOn ? "bg-slate-700 text-white" : "bg-red-500 text-white"}`}
                  onClick={() => setIsCameraOn(!isCameraOn)}
                >
                  {isCameraOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full bg-slate-700 text-white">
                  <Settings className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <form onSubmit={handleJoinMeeting} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meetingId" className="text-slate-700 font-medium">
                  Meeting ID (Optional)
                </Label>
                <Input
                  id="meetingId"
                  type="text"
                  placeholder="Enter meeting ID or leave blank for instant meeting"
                  value={meetingId}
                  onChange={(e) => setMeetingId(e.target.value)}
                  className="h-12 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="displayName" className="text-slate-700 font-medium">
                  Your Name
                </Label>
                <Input
                  id="displayName"
                  type="text"
                  placeholder="Enter your display name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="h-12 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-lg font-semibold bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-lg"
                disabled={isJoining}
              >
                {isJoining ? "Joining..." : "Join Meeting"}
              </Button>
            </form>

            {/* Quick Join Options */}
            <div className="space-y-2">
              <p className="text-sm text-slate-600 text-center">Quick join options</p>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  className="rounded-xl bg-transparent"
                  onClick={() => {
                    setMeetingId("team-standup")
                    handleJoinMeeting(new Event("submit") as any)
                  }}
                >
                  Team Standup
                </Button>
                <Button
                  variant="outline"
                  className="rounded-xl bg-transparent"
                  onClick={() => {
                    setMeetingId("product-review")
                    handleJoinMeeting(new Event("submit") as any)
                  }}
                >
                  Product Review
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
