"use client"

import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Video, Plus, Calendar as CalendarIcon, BookOpen, Settings } from "lucide-react"
import Link from "next/link"
import { Calendar } from "../components/ui/calendar"
import { useSchedules } from "../hooks/useSchedules"
import { BottomNavigation } from "../components/navigation"
import { useState } from "react"
import type { Schedule } from "../lib/utils"

export default function DashboardPage() {
  const { schedules, loading, error } = useSchedules()
  const [date, setDate] = useState<Date>(new Date())
  
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error loading schedules</div>

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6">
            <Calendar 
              mode="single"
              selected={date}
              onSelect={(newDate: Date | undefined) => newDate && setDate(newDate)}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/meetings/new">
                <Button className="w-full" variant="outline">
                  <Video className="w-4 h-4 mr-2" />
                  New Meeting
                </Button>
              </Link>
              <Link href="/schedule">
                <Button className="w-full" variant="outline">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Schedule
                </Button>
              </Link>
              <Link href="/meetings">
                <Button className="w-full" variant="outline">
                  <BookOpen className="w-4 h-4 mr-2" />
                  All Meetings
                </Button>
              </Link>
              <Link href="/profile">
                <Button className="w-full" variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {schedules && schedules.length > 0 && (
          <Card className="md:col-span-2">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Upcoming Schedules</h2>
              <div className="space-y-4">
                {schedules.map((schedule) => (
                  <div key={schedule.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{schedule.event_title}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(schedule.date).toLocaleDateString()} {schedule.start_time} - {schedule.end_time}
                      </p>
                      <p className="text-sm text-gray-500">
                        {schedule.location} {schedule.is_virtual && '(Virtual)'}
                      </p>
                    </div>
                    <Link href={`/schedule/${schedule.id}`}>
                      <Button variant="ghost">View</Button>
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      <BottomNavigation />
    </div>
  )
}
