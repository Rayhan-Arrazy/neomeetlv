"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Plus, Search, Video, Clock, ExternalLink, Edit, Trash2, X, Calendar } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getMeetings, createMeeting, updateMeeting, deleteMeeting, Meeting } from "../lib/utils";
import { BottomNavigation } from "../components/navigation";

export default function MeetingsPage() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [meetings, setMeetings] = useState<Meeting[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    // Form states
    const [showForm, setShowForm] = useState(false);
    const [editingMeeting, setEditingMeeting] = useState<Meeting | null>(null);
    const [formData, setFormData] = useState({ 
        title: '', 
        description: '', 
        start_time: '', 
        end_time: '', 
        meeting_link: '',
        is_virtual: true,
        max_participants: 10,
        enable_chat: true,
        enable_video: true,
        enable_audio: true,
        enable_screenshare: true,
        ai_assistant_enabled: false
    });

    const isAdmin = user?.roles.some((role: { name: string }) => role.name === 'admin');

    useEffect(() => {
        const fetchMeetings = async () => {
            try {
                const token = localStorage.getItem('access_token');
                if (!token) {
                    logout();
                    router.push('/login');
                    return;
                }

                const response = await getMeetings();
                setMeetings(response.data);
                setError(null);
            } catch (err: any) {
                console.error('Meetings fetch error:', err);
                if (err.response?.status === 401) {
                    logout();
                    router.push('/login');
                } else {
                    setError('Failed to fetch meetings. Please try again.');
                }
            } finally {
                setLoading(false);
            }
        };

        if (!user) {
            router.push('/login');
            return;
        }

        setLoading(true);
        fetchMeetings();
    }, [user, logout, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Validate dates before submission
        const startDate = new Date(formData.start_time);
        const endDate = new Date(formData.end_time);
        const now = new Date();

        if (startDate < now) {
            setError("Start time cannot be in the past");
            return;
        }

        if (endDate <= startDate) {
            setError("End time must be after start time");
            return;
        }

        try {
            // Format dates to match Laravel's expected format (Y-m-d H:i:s)
            const formatDateTime = (dateStr: string) => {
                const date = new Date(dateStr);
                return date.getFullYear() +
                    '-' + String(date.getMonth() + 1).padStart(2, '0') +
                    '-' + String(date.getDate()).padStart(2, '0') +
                    ' ' + String(date.getHours()).padStart(2, '0') +
                    ':' + String(date.getMinutes()).padStart(2, '0') +
                    ':00';
            };

            const submitData = {
                ...formData,
                start_time: formatDateTime(formData.start_time),
                end_time: formatDateTime(formData.end_time),
                password: 'meetpass123',
                // Ensure boolean fields are properly typed
                is_virtual: Boolean(formData.is_virtual),
                enable_chat: Boolean(formData.enable_chat),
                enable_video: Boolean(formData.enable_video),
                enable_audio: Boolean(formData.enable_audio),
                enable_screenshare: Boolean(formData.enable_screenshare),
                ai_assistant_enabled: Boolean(formData.ai_assistant_enabled)
            };

            if (editingMeeting) {
                const response = await updateMeeting(editingMeeting.id, submitData);
                setMeetings(meetings.map(m => (m.id === editingMeeting.id ? response.data : m)));
            } else {
                const response = await createMeeting(submitData);
                setMeetings([...meetings, response.data]);
            }
            resetForm();
        } catch (err: any) {
            console.error('Save meeting error:', err.response?.data || err);
            const errorMessage = err.response?.data?.message || 
                               err.response?.data?.errors?.[Object.keys(err.response?.data?.errors)[0]][0] ||
                               'Failed to save meeting.';
            setError(errorMessage);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this meeting?')) return;
        try {
            await deleteMeeting(id);
            setMeetings(meetings.filter(m => m.id !== id));
        } catch (err) {
            setError('Failed to delete meeting.');
        }
    };

    const resetForm = () => {
        setFormData({ 
            title: '', 
            description: '', 
            start_time: '', 
            end_time: '', 
            meeting_link: '',
            is_virtual: true,
            max_participants: 10,
            enable_chat: true,
            enable_video: true,
            enable_audio: true,
            enable_screenshare: true,
            ai_assistant_enabled: false
        });
        setShowForm(false);
        setEditingMeeting(null);
    };

    const handleEdit = (meetingItem: Meeting) => {
        setEditingMeeting(meetingItem);
        const formatDateTime = (dateTimeString: string) => new Date(dateTimeString).toISOString().slice(0, 16);
        setFormData({
            title: meetingItem.title,
            description: meetingItem.description || '',
            start_time: formatDateTime(meetingItem.start_time),
            end_time: formatDateTime(meetingItem.end_time),
            meeting_link: meetingItem.meeting_link || '',
            is_virtual: meetingItem.is_virtual ?? true,
            max_participants: meetingItem.max_participants ?? 10,
            enable_chat: meetingItem.enable_chat ?? true,
            enable_video: meetingItem.enable_video ?? true,
            enable_audio: meetingItem.enable_audio ?? true,
            enable_screenshare: meetingItem.enable_screenshare ?? true,
            ai_assistant_enabled: meetingItem.ai_assistant_enabled ?? false
        });
        setShowForm(true);
    };

    const filteredMeetings = meetings.filter(m =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20 flex items-center justify-center">Loading...</div>;
    if (error) return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20 flex items-center justify-center text-red-500">{error}</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 px-4 py-4">
                <div className="max-w-md mx-auto">
                    <h1 className="text-2xl font-bold text-slate-800">Meetings</h1>
                    <p className="text-slate-600">Manage and join your meetings</p>
                </div>
            </div>

            <div className="max-w-md mx-auto p-4 space-y-6">
                {/* Admin-only Create Button */}
                {isAdmin && (
                    <Button onClick={() => setShowForm(true)} className="w-full rounded-xl bg-green-500 hover:bg-green-600">
                        <Plus className="w-5 h-5 mr-2" /> Create New Meeting
                    </Button>
                )}

                {/* Create/Edit Form */}
                {showForm && (
                    <Card className="border-0 shadow-lg rounded-2xl">
                        <CardContent className="p-4">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">{editingMeeting ? 'Edit Meeting' : 'Create New Meeting'}</h2>
                                <Button variant="ghost" size="icon" onClick={resetForm}><X className="w-4 h-4" /></Button>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <Input placeholder="Meeting Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                                <div className="space-y-2">
                                    <label className="block text-sm text-slate-600">Start Time</label>
                                    <Input 
                                        type="datetime-local" 
                                        value={formData.start_time} 
                                        onChange={(e) => {
                                            const newStartTime = e.target.value;
                                            setFormData(prev => {
                                                // If end time exists and is before new start time, adjust it
                                                if (prev.end_time && new Date(prev.end_time) <= new Date(newStartTime)) {
                                                    const newEndTime = new Date(newStartTime);
                                                    newEndTime.setHours(newEndTime.getHours() + 1);
                                                    return {
                                                        ...prev,
                                                        start_time: newStartTime,
                                                        end_time: newEndTime.toISOString().slice(0, 16)
                                                    };
                                                }
                                                return { ...prev, start_time: newStartTime };
                                            });
                                        }}
                                        min={new Date().toISOString().slice(0, 16)}
                                        required 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm text-slate-600">End Time</label>
                                    <Input 
                                        type="datetime-local" 
                                        value={formData.end_time} 
                                        onChange={(e) => setFormData(prev => ({ ...prev, end_time: e.target.value }))}
                                        min={formData.start_time || new Date().toISOString().slice(0, 16)}
                                        required 
                                    />
                                    {new Date(formData.end_time) <= new Date(formData.start_time) && (
                                        <p className="text-xs text-red-500">End time must be after start time</p>
                                    )}
                                </div>
                                <Input 
                                    type="url" 
                                    placeholder="Meeting Link (e.g., Zoom)" 
                                    value={formData.meeting_link} 
                                    onChange={(e) => setFormData(prev => ({ ...prev, meeting_link: e.target.value }))} 
                                />
                                <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full p-2 border rounded" rows={3}></textarea>
                                <Button type="submit" className="w-full rounded-xl bg-blue-500 hover:bg-blue-600">
                                    {editingMeeting ? 'Update Meeting' : 'Save Meeting'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                )}

                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                        placeholder="Search meetings..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 h-12 rounded-xl border-slate-200"
                    />
                </div>

                {/* Meetings List */}
                <div className="space-y-3">
                    {filteredMeetings.map((meeting) => (
                        <Card key={meeting.id} className="border-0 shadow-lg rounded-2xl">
                            <CardContent className="p-4">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-slate-800">{meeting.title}</h3>
                                        <p className="text-sm text-slate-600">by {meeting.user_id}</p>
                                    </div>
                                    {isAdmin && (
                                        <div className="flex gap-2">
                                            <Button size="icon" variant="outline" onClick={() => handleEdit(meeting)}><Edit className="w-4 h-4" /></Button>
                                            <Button size="icon" variant="destructive" onClick={() => handleDelete(meeting.id)}><Trash2 className="w-4 h-4" /></Button>
                                        </div>
                                    )}
                                </div>
                                <p className="text-sm text-slate-600 mb-3">{meeting.description}</p>
                                <div className="space-y-1 text-sm text-slate-600">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        <span>{new Date(meeting.start_time).toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        <span>Ends: {new Date(meeting.end_time).toLocaleString()}</span>
                                    </div>
                                    {meeting.meeting_link && (
                                        <a href={meeting.meeting_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-500 hover:underline">
                                            <Video className="w-4 h-4" />
                                            <span>Join Meeting</span>
                                            <ExternalLink className="w-3 h-3" />
                                        </a>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
            <BottomNavigation />
        </div>
    );
}