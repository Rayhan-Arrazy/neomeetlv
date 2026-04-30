// frontend/pages/classes.tsx

"use client";

import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Plus, Search, Clock, Edit, Trash2, X } from "lucide-react";
// --- FIX: Update the import path for useAuth ---
import { useAuth } from "../context/AuthContext"; 
import { getClasses, createClass, updateClass, deleteClass, Class } from "../lib/utils";
import { BottomNavigation } from "../components/navigation";

export default function ClassesPage() {
    const { user } = useAuth();
    const [classes, setClasses] = useState<Class[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    // Form states
    const [showForm, setShowForm] = useState(false);
    const [editingClass, setEditingClass] = useState<Class | null>(null);
    const [formData, setFormData] = useState({ name: '', description: '', instructor: '', schedule: '' });

    // --- FIX: Add a simple type to the 'role' parameter ---
    const isAdmin = user?.roles.some((role: { name: string }) => role.name === 'admin');

    // ... the rest of the component code remains the same ...
    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await getClasses();
                setClasses(response.data);
            } catch (err) {
                setError('Failed to fetch classes.');
            } finally {
                setLoading(false);
            }
        };
        fetchClasses();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            if (editingClass) {
                const response = await updateClass(editingClass.id, formData);
                setClasses(classes.map(c => (c.id === editingClass.id ? response.data : c)));
            } else {
                const response = await createClass(formData);
                setClasses([...classes, response.data]);
            }
            resetForm();
        } catch (err) {
            setError('Failed to save class.');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this class?')) return;
        try {
            await deleteClass(id);
            setClasses(classes.filter(c => c.id !== id));
        } catch (err) {
            setError('Failed to delete class.');
        }
    };

    const resetForm = () => {
        setFormData({ name: '', description: '', instructor: '', schedule: '' });
        setShowForm(false);
        setEditingClass(null);
    };

    const handleEdit = (classItem: Class) => {
        setEditingClass(classItem);
        setFormData({
            name: classItem.name,
            description: classItem.description || '',
            instructor: classItem.instructor,
            schedule: classItem.schedule,
        });
        setShowForm(true);
    };

    const filteredClasses = classes.filter(cls =>
        cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cls.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20 flex items-center justify-center">Loading...</div>;
    if (error) return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20 flex items-center justify-center text-red-500">{error}</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 px-4 py-4">
                <div className="max-w-md mx-auto">
                    <h1 className="text-2xl font-bold text-slate-800">Classes</h1>
                    <p className="text-slate-600">Manage and discover learning opportunities</p>
                </div>
            </div>

            <div className="max-w-md mx-auto p-4 space-y-6">
                {/* Admin-only Create Button */}
                {isAdmin && (
                    <Button onClick={() => setShowForm(true)} className="w-full rounded-xl bg-green-500 hover:bg-green-600">
                        <Plus className="w-5 h-5 mr-2" /> Create New Class
                    </Button>
                )}

                {/* Create/Edit Form (shown when button is clicked) */}
                {showForm && (
                    <Card className="border-0 shadow-lg rounded-2xl">
                        <CardContent className="p-4">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">{editingClass ? 'Edit Class' : 'Create New Class'}</h2>
                                <Button variant="ghost" size="icon" onClick={resetForm}><X className="w-4 h-4" /></Button>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <Input placeholder="Class Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                                <Input placeholder="Instructor" value={formData.instructor} onChange={(e) => setFormData({ ...formData, instructor: e.target.value })} required />
                                <Input placeholder="Schedule (e.g., Mon, Wed 10AM)" value={formData.schedule} onChange={(e) => setFormData({ ...formData, schedule: e.target.value })} required />
                                <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full p-2 border rounded" rows={3}></textarea>
                                <Button type="submit" className="w-full rounded-xl bg-blue-500 hover:bg-blue-600">
                                    {editingClass ? 'Update Class' : 'Save Class'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                )}

                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                        placeholder="Search classes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 h-12 rounded-xl border-slate-200"
                    />
                </div>

                {/* Classes List */}
                <div className="space-y-3">
                    {filteredClasses.map((cls) => (
                        <Card key={cls.id} className="border-0 shadow-lg rounded-2xl">
                            <CardContent className="p-4">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-slate-800">{cls.name}</h3>
                                        <p className="text-sm text-slate-600">by {cls.instructor}</p>
                                    </div>
                                    {isAdmin && (
                                        <div className="flex gap-2">
                                            <Button size="icon" variant="outline" onClick={() => handleEdit(cls)}><Edit className="w-4 h-4" /></Button>
                                            <Button size="icon" variant="destructive" onClick={() => handleDelete(cls.id)}><Trash2 className="w-4 h-4" /></Button>
                                        </div>
                                    )}
                                </div>
                                <p className="text-sm text-slate-600 mb-3">{cls.description}</p>
                                <div className="flex items-center gap-4 text-sm text-slate-600">
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        <span>{cls.schedule}</span>
                                    </div>
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