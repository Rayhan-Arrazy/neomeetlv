"use client";

import type React from "react"
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Switch } from "../../components/ui/switch";
import { ArrowLeft, Calendar, Clock, MapPin, Users, Repeat, Bell } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { create } from "../../../server/schedule";

export default function CreateEventPage() {
  const [formData, setFormData] = useState({
    event_title: "",
    description: "",
    type: "",
    date: "",
    start_time: "",
    end_time: "",
    location: "",
    is_virtual: true,
    meeting_link: "",
    attendees: "",
    is_recurring: false,
    recurrence_pattern: "weekly",
    recurrence_end: "",
    reminder: "15",
    is_private: false,
  });
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  const eventTypes = [
    { value: "meeting", label: "Meeting" },
    { value: "class", label: "Class" },
    { value: "workshop", label: "Workshop" },
    { value: "presentation", label: "Presentation" },
    { value: "interview", label: "Interview" },
    { value: "other", label: "Other" },
  ];

  const recurrenceOptions = [
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
  ];

  const reminderOptions = [
    { value: "5", label: "5 minutes before" },
    { value: "15", label: "15 minutes before" },
    { value: "30", label: "30 minutes before" },
    { value: "60", label: "1 hour before" },
    { value: "1440", label: "1 day before" },
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);

    const startDateTime = `${formData.date}T${formData.start_time}`;
    const endDateTime = `${formData.date}T${formData.end_time}`;

    const payload = {
      ...formData,
      start_time: startDateTime,
      end_time: endDateTime,
    };

    try {
      await create(payload);
      window.location.href = "/schedule";
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20">
      <div className="bg-white border-b border-slate-200 px-4 py-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center">
            <Link href="/schedule">
              <Button variant="ghost" size="icon" className="mr-4">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Create Event</h1>
              <p className="text-slate-600">Schedule a new event or meeting</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4">
        <Card className="border-0 shadow-xl rounded-3xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-slate-800">Event Details</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="event_title" className="text-slate-700 font-medium">
                    Event Title
                  </Label>
                  <Input
                    id="event_title"
                    type="text"
                    placeholder="Enter event title"
                    value={formData.event_title}
                    onChange={(e) => handleInputChange("event_title", e.target.value)}
                    className="h-12 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-slate-700 font-medium">
                    Description (Optional)
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Event description or agenda"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className="rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-700 font-medium">Event Type</Label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                    <SelectTrigger className="h-12 rounded-xl border-slate-200">
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="font-semibold text-slate-800">Date & Time</h3>

                <div className="space-y-2">
                  <Label htmlFor="date" className="text-slate-700 font-medium">
                    Date
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange("date", e.target.value)}
                      className="pl-10 h-12 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start_time" className="text-slate-700 font-medium">
                      Start Time
                    </Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input
                        id="start_time"
                        type="time"
                        value={formData.start_time}
                        onChange={(e) => handleInputChange("start_time", e.target.value)}
                        className="pl-10 h-12 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="end_time" className="text-slate-700 font-medium">
                      End Time
                    </Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input
                        id="end_time"
                        type="time"
                        value={formData.end_time}
                        onChange={(e) => handleInputChange("end_time", e.target.value)}
                        className="pl-10 h-12 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                </div>
 </div>

              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="font-semibold text-slate-800">Location</h3>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-800">Virtual Meeting</p>
                    <p className="text-sm text-slate-600">Host online via video call</p>
                  </div>
                  <Switch
                    checked={formData.is_virtual}
                    onCheckedChange={(checked) => handleInputChange("is_virtual", checked)}
                  />
                </div>

                {formData.is_virtual ? (
                  <div className="space-y-2">
                    <Label htmlFor="meeting_link" className="text-slate-700 font-medium">
                      Meeting Link (Optional)
                    </Label>
                    <Input
                      id="meeting_link"
                      type="url"
                      placeholder="https://meet.example.com/room"
                      value={formData.meeting_link}
                      onChange={(e) => handleInputChange("meeting_link", e.target.value)}
                      className="h-12 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-slate-700 font-medium">
                      Physical Location
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input
                        id="location"
                        type="text"
                        placeholder="Enter location address"
                        value={formData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        className="pl-10 h-12 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                        required={!formData.is_virtual}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="font-semibold text-slate-800">Attendees</h3>

                <div className="space-y-2">
                  <Label htmlFor="attendees" className="text-slate-700 font-medium">
                    Invite Attendees (Optional)
                  </Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      id="attendees"
                      type="text"
                      placeholder="Enter email addresses separated by commas"
                      value={formData.attendees}
                      onChange={(e) => handleInputChange("attendees", e.target.value)}
                      className="pl-10 h-12 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="font-semibold text-slate-800">Recurrence</h3>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Repeat className="w-5 h-5 text-slate-500" />
                    <div>
                      <p className="font-medium text-slate-800">Recurring Event</p>
                      <p className="text-sm text-slate-600">Repeat this event</p>
                    </div>
                  </div>
                  <Switch
                    checked={formData.is_recurring}
                    onCheckedChange={(checked) => handleInputChange("is_recurring", checked)}
                  />
                </div>

                {formData.is_recurring && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-slate-700 font-medium">Repeat</Label>
                      <Select
                        value={formData.recurrence_pattern}
                        onValueChange={(value) => handleInputChange("recurrence_pattern", value)}
                      >
                        <SelectTrigger className="h-12 rounded-xl border-slate-200">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {recurrenceOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="recurrence_end" className="text-slate-700 font-medium">
                        End Date
                      </Label>
                      <Input
                        id="recurrence_end"
                        type="date"
                        value={formData.recurrence_end}
                        onChange={(e) => handleInputChange("recurrence_end", e.target.value)}
                        className="h-12 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="font-semibold text-slate-800">Notifications</h3>

                <div className="space-y-2">
                  <Label className="text-slate-700 font-medium">Reminder</Label>
                  <div className="relative">
                    <Bell className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Select value={formData.reminder} onValueChange={(value) => handleInputChange("reminder", value)}>
                      <SelectTrigger className="pl-10 h-12 rounded-xl border-slate-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {reminderOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-800">Private Event</p>
                    <p className="text-sm text-slate-600">Only you can see this event</p>
                  </div>
                  <Switch
                    checked={formData.is_private}
                    onCheckedChange={(checked) => handleInputChange("is_private", checked)}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-lg font-semibold bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-lg"
                disabled={isCreating}
              >
                {isCreating ? "Creating Event..." : "Create Event"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}