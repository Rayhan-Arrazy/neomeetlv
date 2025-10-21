"use client"

import { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Video, Plus, Calendar, BookOpen, Settings, ChevronLeft, ChevronRight, MapPin } from "lucide-react"
import Link from "next/link"
import { BottomNavigation } from "../components/navigation"
import { useAuth } from "../context/AuthContext"
import { getSchedules, getMeetings, getClasses, Schedule, Meeting, Class } from "../lib/utils"
import { Badge } from "../components/ui/badge"

export default function DashboardPage() {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [meetings, setMeetings] = useState<Meeting[]>([])
  const [classes, setClasses] = useState<Class[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load all data from database
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [schedulesData, meetingsData, classesData] = await Promise.all([
          getSchedules(),
          getMeetings(),
          getClasses()
        ]);

        // Filter data for the current user
        const userSchedules = schedulesData.data.filter(s => s.user_id === user?.id);
        const userMeetings = meetingsData.data.filter(m => m.user_id === user?.id);
        const userClasses = classesData.data.filter(c => c.user_id === user?.id);

        setSchedules(userSchedules);
        setMeetings(userMeetings);
        setClasses(userClasses);
      } catch (err) {
        setError('Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadData();
    }
  }, [user]);

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

    // Convert schedules to generic event format
    const scheduleEvents = schedules.map(schedule => ({
      id: `schedule-${schedule.id}`,
      date: schedule.date,
      start_time: schedule.start_time,
      end_time: schedule.end_time,
      event_title: schedule.event_title,
      type: schedule.type,
      description: schedule.description,
      location: schedule.location || '',
      is_virtual: schedule.is_virtual || false,
      source: 'schedule'
    }));

    // Convert meetings to generic event format
    const meetingEvents = meetings.map(meeting => ({
      id: `meeting-${meeting.id}`,
      date: new Date(meeting.start_time).toISOString().split('T')[0],
      start_time: new Date(meeting.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
      end_time: new Date(meeting.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
      event_title: meeting.title,
      type: 'meeting',
      description: meeting.description,
      location: meeting.meeting_link || '',
      is_virtual: true,
      source: 'meeting'
    }));

    // Convert classes to generic event format
    const classEvents = classes.map(classItem => ({
      id: `class-${classItem.id}`,
      date: new Date().toISOString().split('T')[0], // Use schedule date if available
      start_time: '09:00', // Use schedule time if available
      end_time: '10:30', // Use schedule time if available
      event_title: classItem.name,
      type: 'class',
      description: classItem.description || '',
      location: classItem.instructor ? `Instructor: ${classItem.instructor}` : '',
      is_virtual: false,
      source: 'class'
    }));

    // Combine all events
    const allEvents = [...scheduleEvents, ...meetingEvents, ...classEvents];

    // Filter and sort upcoming events
    return allEvents
      .filter(event => {
        const eventDateTime = new Date(`${event.date}T${event.start_time}`);
        return eventDateTime >= now;
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
    ).sort((a, b) => a.start_time.localeCompare(b.start_time));
  };

  const renderCalendarDays = () => {
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayWeekday; i++) {
      days.push(<div key={`empty-${i}`} className="h-10" />)
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
          title={dayEvents.map(e => `${e.event_title} (${e.start_time})`).join('\n')}
          className={`relative h-10 w-full rounded-lg text-sm font-medium transition-colors ${
            isToday
              ? "bg-blue-500 text-white"
              : isSelected
                ? "bg-blue-100 text-blue-600"
                : dayEvents.length > 0
                  ? "bg-slate-50 text-slate-700 hover:bg-slate-100"
                  : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          <span className="absolute top-1 left-1/2 transform -translate-x-1/2">{day}</span>
          {/* Event indicators */}
          {(hasClasses || hasMeetings) && (
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1">
              {dayEvents.slice(0, 2).map((event, i) => (
                <div 
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full ${
                    event.type === 'class' ? 'bg-orange-500' : 'bg-blue-500'
                  }`} 
                />
              ))}
              {dayEvents.length > 2 && (
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              )}
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
                    } rounded-xl hover:opacity-90 transition-opacity cursor-pointer`}
                  >
                    <div className="flex-shrink-0">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        event.type === 'meeting' ? 'bg-blue-100' : 'bg-orange-100'
                      }`}>
                        {event.type === 'meeting' ? (
                          <Video className={`w-5 h-5 text-blue-600`} />
                        ) : (
                          <BookOpen className={`w-5 h-5 text-orange-600`} />
                        )}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-medium text-slate-800 truncate">{event.event_title}</p>
                        <Badge 
                          variant="outline" 
                          className={`flex-shrink-0 ${
                            event.type === 'meeting' 
                              ? 'text-blue-600 border-blue-200 bg-blue-50' 
                              : 'text-orange-600 border-orange-200 bg-orange-50'
                          }`}
                        >
                          {event.type}
                        </Badge>
                      </div>
                      <div className="mt-1 text-sm">
                        <p className="text-slate-600">
                          {dateDisplay}, {event.start_time} - {event.end_time}
                        </p>
                        {event.location && (
                          <div className="flex items-center gap-1 text-slate-500 mt-0.5">
                            <MapPin className="w-3 h-3" />
                            <span className="text-xs truncate">
                              {event.is_virtual ? `Virtual • ${event.location}` : event.location}
                            </span>
                          </div>
                        )}
                      </div>
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
