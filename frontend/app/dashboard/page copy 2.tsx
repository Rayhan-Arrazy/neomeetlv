"use client"

import { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Video, Plus, Calendar, BookOpen, Settings, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { BottomNavigation } from "../components/navigation"
import { useAuth } from "../context/AuthContext"
import { getSchedules, Schedule } from "../lib/utils"

export default function DashboardPage() {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load schedules from database
  useEffect(() => {
    const loadSchedules = async () => {
      setLoading(true);
      try {
        const data = await getSchedules();
        setSchedules(data.data);
      } catch (err) {
        setError('Failed to fetch schedules.');
      } finally {
        setLoading(false);
      }
    };
    loadSchedules();
  }, []);

  // Get today's stats
  const todaySchedules = schedules.filter(schedule => 
    new Date(schedule.date).toDateString() === new Date().toDateString()
  );

  const todayStats = {
    classes: todaySchedules.filter(s => s.type === 'class').length,
    meetings: todaySchedules.filter(s => s.type === 'meeting').length,
  }

  // Get upcoming events (events from now onwards, sorted by date and time)
  const getUpcomingEvents = () => {
    const now = new Date();
    return schedules
      .filter(schedule => {
        const scheduleDateTime = new Date(`${schedule.date}T${schedule.start_time}`);
        return scheduleDateTime >= now;
      })
      .sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.start_time}`);
        const dateB = new Date(`${b.date}T${b.start_time}`);
        return dateA.getTime() - dateB.getTime();
      })
      .slice(0, 5); // Get next 5 upcoming events
  };

  // Calendar logic
  const today = new Date()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
  const firstDayWeekday = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const weekDays = ["S", "M", "T", "W", "T", "F", "S"]

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + (direction === "next" ? 1 : -1), 1))
  }

  const getEventsForDate = (date: Date) => {
    return schedules.filter(schedule => 
      new Date(schedule.date).toDateString() === date.toDateString()
    );
  };

  const renderCalendarDays = () => {
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayWeekday; i++) {
      days.push(<div key={`empty-${i}`} className="h-8" />)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      const isToday = date.toDateString() === today.toDateString()
      const isSelected = date.toDateString() === selectedDate.toDateString()
      const dayEvents = getEventsForDate(date)
      const hasClasses = dayEvents.some(e => e.type === 'class')
      const hasMeetings = dayEvents.some(e => e.type === 'meeting')

      days.push(
        <button
          key={day}
          onClick={() => setSelectedDate(date)}
          title={dayEvents.length > 0 ? `${dayEvents.length} events on this day` : undefined}
          className={`relative h-8 w-8 rounded-lg text-sm font-medium transition-colors ${
            isToday
              ? "bg-blue-500 text-white"
              : isSelected
                ? "bg-blue-100 text-blue-600"
                : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          {day}
          {/* Event indicators */}
          {(hasClasses || hasMeetings) && (
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1">
              {hasClasses && <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />}
              {hasMeetings && <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
            </div>
          )}
        </button>
      )
    }

    return days
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
              <span className="text-white text-lg font-bold">N</span>
            </div>
            <span className="ml-2 text-xl font-bold text-slate-800">NeoMeet</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/profile">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/professional-headshot.png" />
                <AvatarFallback>AJ</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Greeting */}
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Hello {user?.name?.split(" ")[0] || "User"}</h1>
          <p className="text-slate-600">
            You have {todayStats.classes} classes and {todayStats.meetings} meetings today
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/meetings/join">
            <Card className="border-0 shadow-lg rounded-2xl bg-blue-500 text-white hover:bg-blue-600 transition-colors">
              <CardContent className="p-4 text-center">
                <Video className="w-8 h-8 mx-auto mb-2" />
                <p className="font-semibold">Join Meeting</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/schedule">
            <Card className="border-0 shadow-lg rounded-2xl bg-green-500 text-white hover:bg-green-600 transition-colors">
              <CardContent className="p-4 text-center">
                <Calendar className="w-8 h-8 mx-auto mb-2" />
                <p className="font-semibold">My Schedule</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Calendar */}
        <Card className="border-0 shadow-lg rounded-2xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-800">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" onClick={() => navigateMonth("prev")}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => navigateMonth("next")}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* <div className="grid grid-cols-7 gap-1 mb-2">
              {weekDays.map((day) => (
                <div key={day} className="h-8 flex items-center justify-center">
                  <span className="text-xs font-medium text-slate-500">{day}</span>
                </div>
              ))}
            </div> */}
            
            <div className="grid grid-cols-7 gap-1 mb-2">
              {weekDays.map((day, index) => (
                <div key={index} className="h-8 flex items-center justify-center">
                  <span className="text-xs font-medium text-slate-500">{day}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">{renderCalendarDays()}</div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="border-0 shadow-lg rounded-2xl">
          <CardContent className="p-4">
            <h3 className="font-semibold text-slate-800 mb-3">Upcoming</h3>
            <div className="space-y-3">
              {getUpcomingEvents().map((event) => {
                const eventDate = new Date(event.date);
                const isToday = eventDate.toDateString() === new Date().toDateString();
                const isTomorrow = eventDate.toDateString() === new Date(Date.now() + 86400000).toDateString();
                
                let dateDisplay = isToday 
                  ? "Today" 
                  : isTomorrow 
                    ? "Tomorrow" 
                    : eventDate.toLocaleDateString("en-US", { weekday: 'long', month: 'short', day: 'numeric' });

                return (
                  <div 
                    key={event.id} 
                    className={`flex items-center gap-3 p-3 ${
                      event.type === 'meeting' ? 'bg-blue-50' : 'bg-orange-50'
                    } rounded-xl`}
                  >
                    <div className={`w-2 h-2 ${
                      event.type === 'meeting' ? 'bg-blue-500' : 'bg-orange-500'
                    } rounded-full`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-slate-800">{event.event_title}</p>
                        <Badge variant="outline" className={`${
                          event.type === 'meeting' ? 'text-blue-600 border-blue-200' : 'text-orange-600 border-orange-200'
                        }`}>
                          {event.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 mt-1">
                        {dateDisplay}, {event.start_time} - {event.end_time}
                      </p>
                      {event.is_virtual && (
                        <p className="text-xs text-slate-500 mt-1">
                          Virtual • {event.location}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
              {getUpcomingEvents().length === 0 && (
                <div className="text-center text-slate-500 py-4">
                  No upcoming events
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  )
}
