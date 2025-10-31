"use client";

import { useState, useEffect } from "react";
// --- FIX: Add missing imports ---
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input"; // This was the main missing import
import { ChevronLeft, ChevronRight, Plus, Calendar, Clock, Edit, Trash2, X } from "lucide-react";
// --- FIX: Update the import path for useAuth ---
import { useAuth } from "../context/AuthContext";
import { getSchedules, createSchedule, updateSchedule, deleteSchedule, Schedule } from "../lib/utils";
import { BottomNavigation } from "../components/navigation";

export default function SchedulePage() {
    const { user } = useAuth();
    const [events, setEvents] = useState<Schedule[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Form states
    const [showForm, setShowForm] = useState(false);
    const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
    const [formData, setFormData] = useState({
        event_title: '',
        description: '',
        date: '',
        start_time: '',
        end_time: '',
        type: 'meeting',
        is_virtual: false,
        meeting_link: '',
        reminder: false,
        is_private: false,
        location: '',
        attendees: '',
        is_recurring: false,
        recurrence_pattern: '',
        recurrence_end: ''
    });

    // --- FIX: Add a simple type to the 'role' parameter ---
    const isAdmin = user?.roles.some((role: { name: string }) => role.name === 'admin');

    // ... the rest of the component code remains the same ...
    const loadEvents = async () => {
        setLoading(true);
        try {
            const data = await getSchedules();
            setEvents(data.data);
        } catch (err) {
            setError('Failed to fetch schedules.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadEvents();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            if (!formData.date || !formData.start_time || !formData.end_time || !formData.event_title) {
                setError('Please fill in all required fields.');
                return;
            }

            const submitData = {
                ...formData,
                type: formData.type || 'meeting',
                reminder: formData.reminder ? "1" : "0",
                is_virtual: Boolean(formData.is_virtual),
                is_recurring: Boolean(formData.is_recurring),
                is_private: Boolean(formData.is_private),
                recurrence_pattern: formData.recurrence_pattern || undefined,
                recurrence_end: formData.recurrence_end || undefined,
                description: formData.description || '',
                location: formData.location || '',
                meeting_link: formData.meeting_link || '',
                attendees: formData.attendees || ''
            };

            if (editingSchedule) {
                const response = await updateSchedule(editingSchedule.id, submitData);
                setEvents(events.map(s => (s.id === editingSchedule.id ? response.data : s)));
            } else {
                const response = await createSchedule(submitData);
                setEvents([...events, response.data]);
            }
            resetForm();
        } catch (err) {
            setError('Failed to save schedule.');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this schedule?')) return;
        try {
            await deleteSchedule(id);
            loadEvents(); // Reload to update calendar view
        } catch (err) {
            setError('Failed to delete schedule.');
        }
    };

    const resetForm = () => {
        setFormData({
            event_title: '',
            description: '',
            date: '',
            start_time: '',
            end_time: '',
            type: 'meeting',
            is_virtual: false,
            meeting_link: '',
            reminder: false,
            is_private: false,
            location: '',
            attendees: '',
            is_recurring: false,
            recurrence_pattern: '',
            recurrence_end: ''
        });
        setShowForm(false);
        setEditingSchedule(null);
    };

    const handleEdit = (scheduleItem: Schedule) => {
        setFormData({
            event_title: scheduleItem.event_title || '',
            description: scheduleItem.description || '',
            date: scheduleItem.date || '',
            start_time: scheduleItem.start_time || '',
            end_time: scheduleItem.end_time || '',
            type: scheduleItem.type || '',
            is_virtual: Boolean(scheduleItem.is_virtual),
            meeting_link: scheduleItem.meeting_link || '',
            reminder: Boolean(scheduleItem.reminder),
            is_private: Boolean(scheduleItem.is_private),
            location: scheduleItem.location || '',
            attendees: scheduleItem.attendees || '',
            is_recurring: Boolean(scheduleItem.is_recurring),
            recurrence_pattern: scheduleItem.recurrence_pattern || '',
            recurrence_end: scheduleItem.recurrence_end || ''
        });
        setEditingSchedule(scheduleItem);
        setShowForm(true);
    };

    // Event management functions
    const getUpcomingEvents = () => {
        const now = new Date();
        return events
            .filter(event => {
                const eventDateTime = new Date(`${event.date} ${event.start_time}`);
                return eventDateTime >= now;
            })
            .sort((a, b) => {
                const dateA = new Date(`${a.date} ${a.start_time}`);
                const dateB = new Date(`${b.date} ${b.start_time}`);
                return dateA.getTime() - dateB.getTime();
            });
    };

    // Calendar Logic
    const today = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const firstDayWeekday = firstDayOfMonth.getDay();
    const daysInMonth = lastDayOfMonth.getDate();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const navigateMonth = (direction: "prev" | "next") => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + (direction === "next" ? 1 : -1), 1));
    };

    const getEventsForDate = (date: Date) => {
        return events.filter((event) => new Date(event.date).toDateString() === date.toDateString());
    };
    // --- End Calendar Logic ---

    if (loading) return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20 flex items-center justify-center">Loading...</div>;
    if (error) return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20 flex items-center justify-center text-red-500">{error}</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 px-4 py-4">
                <div className="max-w-md mx-auto">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-800">Schedule</h1>
                            <p className="text-slate-600">Manage your calendar and events</p>
                        </div>
                        {isAdmin && (
                            <Button size="icon" className="rounded-xl bg-blue-500 hover:bg-blue-600" onClick={() => setShowForm(true)}>
                                <Plus className="w-5 h-5" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-md mx-auto p-4 space-y-6">
                {/* Create/Edit Form Modal */}
                {showForm && (
                    <Card className="border-0 shadow-lg rounded-2xl">
                        <CardContent className="p-4">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">{editingSchedule ? 'Edit Schedule' : 'Create New Schedule'}</h2>
                                <Button variant="ghost" size="icon" onClick={resetForm}><X className="w-4 h-4" /></Button>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <Input 
                                    placeholder="Schedule Title" 
                                    value={formData.event_title} 
                                    onChange={(e) => setFormData({ ...formData, event_title: e.target.value })} 
                                    required 
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="block text-sm">Date</label>
                                        <Input 
                                            type="date" 
                                            value={formData.date} 
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })} 
                                            required 
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm">Type</label>
                                        <select 
                                            className="w-full p-2 border rounded"
                                            value={formData.type}
                                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                        >
                                            <option value="meeting">Meeting</option>
                                            <option value="class">Class</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="block text-sm">Start Time</label>
                                        <Input 
                                            type="time" 
                                            value={formData.start_time} 
                                            onChange={(e) => setFormData({ ...formData, start_time: e.target.value })} 
                                            required 
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm">End Time</label>
                                        <Input 
                                            type="time" 
                                            value={formData.end_time} 
                                            onChange={(e) => setFormData({ ...formData, end_time: e.target.value })} 
                                            required 
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm">Location</label>
                                    <Input 
                                        placeholder="Location" 
                                        value={formData.location} 
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })} 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm">Description</label>
                                    <textarea 
                                        placeholder="Description" 
                                        value={formData.description} 
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
                                        className="w-full p-2 border rounded" 
                                        rows={3}
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2">
                                        <input 
                                            type="checkbox" 
                                            checked={formData.is_virtual} 
                                            onChange={(e) => setFormData({ ...formData, is_virtual: e.target.checked })} 
                                        />
                                        Virtual
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input 
                                            type="checkbox" 
                                            checked={formData.reminder} 
                                            onChange={(e) => setFormData({ ...formData, reminder: e.target.checked })} 
                                        />
                                        Set Reminder
                                    </label>
                                </div>
                                {formData.is_virtual && (
                                    <Input 
                                        placeholder="Meeting Link" 
                                        value={formData.meeting_link} 
                                        onChange={(e) => setFormData({ ...formData, meeting_link: e.target.value })} 
                                    />
                                )}
                                <Button type="submit" className="w-full rounded-xl bg-blue-500 hover:bg-blue-600">
                                    {editingSchedule ? 'Update Schedule' : 'Save Schedule'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                )}

                {/* Calendar Component (unchanged) */}
                <Card className="border-0 shadow-lg rounded-2xl">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-slate-800">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
                            <div className="flex gap-1">
                                <Button variant="ghost" size="icon" onClick={() => navigateMonth("prev")}><ChevronLeft className="w-4 h-4" /></Button>
                                <Button variant="ghost" size="icon" onClick={() => navigateMonth("next")}><ChevronRight className="w-4 h-4" /></Button>
                            </div>
                        </div>
                        <div className="grid grid-cols-7 gap-1 mb-2">{weekDays.map((day) => (<div key={day} className="h-8 flex items-center justify-center"><span className="text-xs font-medium text-slate-500">{day}</span></div>))}</div>
                        <div className="grid grid-cols-7 gap-1">
                            {Array.from({ length: firstDayWeekday }).map((_, i) => (<div key={`empty-${i}`} className="h-12" />))}
                            {Array.from({ length: daysInMonth }).map((_, i) => {
                                const day = i + 1;
                                const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                                const isToday = date.toDateString() === today.toDateString();
                                const isSelected = date.toDateString() === selectedDate.toDateString();
                                const dayEvents = getEventsForDate(date);
                                const hasEvents = dayEvents.length > 0;
                                return (
                                    <button key={day} onClick={() => setSelectedDate(date)} className={`h-12 w-full rounded-lg text-sm font-medium transition-colors relative ${isToday ? "bg-blue-500 text-white" : isSelected ? "bg-blue-100 text-blue-600" : hasEvents ? "bg-slate-100 text-slate-800 hover:bg-slate-200" : "text-slate-700 hover:bg-slate-100"}`}>
                                        {day}
                                        {hasEvents && (<div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1">{dayEvents.slice(0, 3).map((_, index) => (<div key={index} className="w-1.5 h-1.5 rounded-full bg-blue-500" />))}</div>)}
                                    </button>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Selected Date Events List */}
                <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">{selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</h3>
                    {getEventsForDate(selectedDate).length === 0 ? (
                        <Card className="border-0 shadow-lg rounded-2xl"><CardContent className="p-6 text-center"><Calendar className="w-12 h-12 text-slate-400 mx-auto mb-3" /><p className="text-slate-600">No events scheduled for this day</p></CardContent></Card>
                    ) : (
                        <div className="space-y-3">
                            {getEventsForDate(selectedDate).map((event) => (
                                <Card key={event.id} className="border-0 shadow-lg rounded-2xl">
                                    <CardContent className="p-4">
                                        <div className="flex items-start justify-between mb-2">
                                            <h4 className="font-semibold text-slate-800">{event.event_title}</h4>
                                            {isAdmin && (
                                                <div className="flex gap-2">
                                                    <Button size="icon" variant="outline" onClick={() => handleEdit(event)}><Edit className="w-4 h-4" /></Button>
                                                    <Button size="icon" variant="destructive" onClick={() => handleDelete(event.id)}><Trash2 className="w-4 h-4" /></Button>
                                                </div>
                                            )}
                                        </div>
                                        <p className="text-sm text-slate-600 mb-2">{event.description}</p>
                                        <div className="flex items-center justify-between text-sm text-slate-600">
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4" />
                                                <span>{event.start_time} - {event.end_time}</span>
                                            </div>
                                            <div>
                                                {event.is_virtual ? 'Virtual Meeting' : event.location}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <BottomNavigation />
        </div>
    );
}
