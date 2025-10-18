"use client";

import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { ChevronLeft, ChevronRight, Plus, Calendar, Clock, MapPin, Users, Video, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BottomNavigation } from "../components/navigation";
import { getAll, remove, Schedule } from "../../server/schedule";

export default function SchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month");
  const [events, setEvents] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const loadEvents = async () => {
    setLoading(true);
    const data = await getAll();
    setEvents(data);
    setLoading(false);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleDelete = async (id: number) => {
    const success = await remove(id);
    if (success) {
      loadEvents();
    }
  };

  const today = new Date();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + (direction === "next" ? 1 : -1), 1));
  };

  const getEventsForDate = (date: Date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.start_time);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const getSelectedDateEvents = () => {
    return getEventsForDate(selectedDate);
  };

  const renderCalendarDays = () => {
    const days = [];

    for (let i = 0; i < firstDayWeekday; i++) {
      days.push(<div key={`empty-${i}`} className="h-12" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isToday = date.toDateString() === today.toDateString();
      const isSelected = date.toDateString() === selectedDate.toDateString();
      const dayEvents = getEventsForDate(date);
      const hasEvents = dayEvents.length > 0;

      days.push(
        <button
          key={day}
          onClick={() => setSelectedDate(date)}
          className={`h-12 w-full rounded-lg text-sm font-medium transition-colors relative ${
            isToday
              ? "bg-blue-500 text-white"
              : isSelected
                ? "bg-blue-100 text-blue-600"
                : hasEvents
                  ? "bg-slate-100 text-slate-800 hover:bg-slate-200"
                  : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          {day}
          {hasEvents && (
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
              {dayEvents.slice(0, 3).map((event, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full bg-blue-500`}
                />
              ))}
            </div>
          )}
        </button>,
      );
    }

    return days;
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case "meeting":
        return <Video className="w-4 h-4" />;
      case "class":
        return <Calendar className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case "meeting":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "class":
        return "bg-orange-100 text-orange-700 border-orange-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20">
      <div className="bg-white border-b border-slate-200 px-4 py-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Schedule</h1>
              <p className="text-slate-600">Manage your calendar and events</p>
            </div>
            <Link href="/schedule/create">
              <Button size="icon" className="rounded-xl bg-blue-500 hover:bg-blue-600">
                <Plus className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6">

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

            <div className="grid grid-cols-7 gap-1 mb-2">
              {weekDays.map((day) => (
                <div key={day} className="h-8 flex items-center justify-center">
                  <span className="text-xs font-medium text-slate-500">{day}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">{renderCalendarDays()}</div>
          </CardContent>
        </Card>

        <div>
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            {selectedDate.toDateString() === today.toDateString()
              ? "Today's Events"
              : selectedDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
          </h3>

          {getSelectedDateEvents().length === 0 ? (
            <Card className="border-0 shadow-lg rounded-2xl">
              <CardContent className="p-6 text-center">
                <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <p className="text-slate-600">No events scheduled for this day</p>
                <Link href="/schedule/create" className="inline-block mt-3">
                  <Button variant="outline" className="rounded-xl bg-transparent">
                    Add Event
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {getSelectedDateEvents().map((event) => {
                const eventDate = new Date(event.start_time);
                const eventEndTime = new Date(event.end_time);
                const duration = Math.round((eventEndTime.getTime() - eventDate.getTime()) / 60000);
                const attendeeCount = event.attendees ? event.attendees.split(',').length : 0;

                return (
                  <Card key={event.id} className="border-0 shadow-lg rounded-2xl">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${getEventColor(event.type)}`}>{getEventIcon(event.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-slate-800">{event.event_title}</h4>
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                event.type === "meeting"
                                  ? "text-blue-600 border-blue-200"
                                  : "text-orange-600 border-orange-200"
                              }`}
                            >
                              {event.type}
                            </Badge>
                          </div>
                          <div className="space-y-1 text-sm text-slate-600">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>
                                {eventDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })} • {duration} min
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              <span>{event.is_virtual ? 'Virtual' : event.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              <span>{attendeeCount} attendees</span>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-3">
                            <Button size="sm" className="rounded-xl bg-blue-500 hover:bg-blue-600">
                              Join
                            </Button>
                            <Button size="sm" variant="outline" className="rounded-xl bg-transparent">
                              Details
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => router.push(`/schedule/edit/${event.id}`)}>
                              <Edit className="w-4 h-4"/>
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleDelete(event.id)}>
                              <Trash2 className="w-4 h-4"/>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card className="border-0 shadow-lg rounded-2xl">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">12</div>
              <p className="text-sm text-slate-600">This Week</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg rounded-2xl">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">48</div>
              <p className="text-sm text-slate-600">This Month</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}