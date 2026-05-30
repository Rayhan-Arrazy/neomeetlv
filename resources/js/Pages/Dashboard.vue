<script setup lang="ts">
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link } from '@inertiajs/vue3';
import { Calendar, Users, BookOpen, Clock, ArrowRight, Video } from 'lucide-vue-next';

defineProps<{
    meetings: any[];
    classes: any[];
    schedules: any[];
    canCreateMeeting: boolean;
    canManageClasses: boolean;
}>();
</script>

<template>
    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <div class="py-8 md:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
            <div class="flex items-center justify-between">
                <div>
                    <h2 class="text-3xl font-black text-white tracking-tight">Dashboard Overview</h2>
                    <p class="text-slate-400 mt-1">Welcome back! Here's what's happening today.</p>
                </div>
            </div>
                <!-- Stats Grid -->
                <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div class="p-6 glass-card rounded-3xl border border-blue-500/20">
                        <div class="flex items-center justify-between mb-4">
                            <div class="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center">
                                <Video class="w-6 h-6 text-blue-500" />
                            </div>
                            <span class="text-xs font-bold text-blue-400 uppercase tracking-widest">Active</span>
                        </div>
                        <div class="text-3xl font-black text-white mb-1">{{ meetings.length }}</div>
                        <div class="text-sm text-slate-500 font-medium">Upcoming Meetings</div>
                    </div>

                    <div class="p-6 glass-card rounded-3xl border border-indigo-500/20">
                        <div class="flex items-center justify-between mb-4">
                            <div class="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center">
                                <BookOpen class="w-6 h-6 text-indigo-500" />
                            </div>
                            <span class="text-xs font-bold text-indigo-400 uppercase tracking-widest">Enrolled</span>
                        </div>
                        <div class="text-3xl font-black text-white mb-1">{{ classes.length }}</div>
                        <div class="text-sm text-slate-500 font-medium">Active Classes</div>
                    </div>

                    <div class="p-6 glass-card rounded-3xl border border-purple-500/20">
                        <div class="flex items-center justify-between mb-4">
                            <div class="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center">
                                <Calendar class="w-6 h-6 text-purple-500" />
                            </div>
                            <span class="text-xs font-bold text-purple-400 uppercase tracking-widest">Planned</span>
                        </div>
                        <div class="text-3xl font-black text-white mb-1">{{ schedules.length }}</div>
                        <div class="text-sm text-slate-500 font-medium">Weekly Schedules</div>
                    </div>
                </div>

                <!-- Main Content Grid -->
                <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    <!-- Meetings Section -->
                    <div class="space-y-4">
                        <div class="flex items-center justify-between">
                            <h3 class="text-xl font-bold text-white flex items-center gap-2">
                                <Video class="w-5 h-5 text-blue-500" />
                                Upcoming Meetings
                            </h3>
                            <div class="flex items-center gap-3">
                                <button v-if="canCreateMeeting" class="px-4 py-2 bg-blue-600/10 border border-blue-600/20 text-blue-400 text-xs font-bold rounded-full hover:bg-blue-600/20 transition-all flex items-center gap-2">
                                    <Plus class="w-3 h-3" /> Create
                                </button>
                                <button class="text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
                                    View All <ArrowRight class="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        
                        <div v-if="meetings.length > 0" class="space-y-4">
                            <div v-for="meeting in meetings" :key="meeting.id" class="p-5 glass-card rounded-2xl group hover:border-white/20 transition-all">
                                <div class="flex items-center justify-between">
                                    <div class="space-y-1">
                                        <h4 class="font-bold text-white group-hover:text-blue-400 transition-colors">{{ meeting.title }}</h4>
                                        <div class="flex items-center gap-3 text-sm text-slate-500">
                                            <span class="flex items-center gap-1"><Clock class="w-4 h-4" /> {{ meeting.start_time }}</span>
                                            <span class="flex items-center gap-1"><Users class="w-4 h-4" /> {{ meeting.attendees_count || 0 }} attendees</span>
                                        </div>
                                    </div>
                                    <Link :href="route('meetings.room', meeting.id)" class="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-full transition-all active:scale-95">
                                        Join
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div v-else class="p-12 glass-card rounded-3xl text-center border-dashed border-white/5">
                            <Video class="w-12 h-12 text-slate-700 mx-auto mb-4" />
                            <p class="text-slate-500 font-medium">No meetings scheduled yet.</p>
                        </div>
                    </div>

                    <!-- Classes Section -->
                    <div class="space-y-4">
                        <div class="flex items-center justify-between">
                            <h3 class="text-xl font-bold text-white flex items-center gap-2">
                                <BookOpen class="w-5 h-5 text-indigo-500" />
                                My Classes
                            </h3>
                            <div class="flex items-center gap-3">
                                <button v-if="canManageClasses" class="px-4 py-2 bg-indigo-600/10 border border-indigo-600/20 text-indigo-400 text-xs font-bold rounded-full hover:bg-indigo-600/20 transition-all flex items-center gap-2">
                                    <Plus class="w-3 h-3" /> New Class
                                </button>
                                <button class="text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1">
                                    Explore <ArrowRight class="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div v-if="classes.length > 0" class="space-y-4">
                            <Link v-for="cls in classes" :key="cls.id" :href="route('classes.show', cls.id)" class="block p-5 glass-card rounded-2xl group hover:border-white/20 transition-all">
                                <div class="flex items-center gap-4">
                                    <div class="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center font-bold text-indigo-500">
                                        {{ cls.name.charAt(0) }}
                                    </div>
                                    <div class="flex-1">
                                        <h4 class="font-bold text-white">{{ cls.name }}</h4>
                                        <p class="text-sm text-slate-500 line-clamp-1">{{ cls.description }}</p>
                                    </div>
                                    <div class="text-right">
                                        <div class="text-xs font-bold text-slate-400 uppercase tracking-tighter">{{ cls.schedule }}</div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div v-else class="p-12 glass-card rounded-3xl text-center border-dashed border-white/5">
                            <BookOpen class="w-12 h-12 text-slate-700 mx-auto mb-4" />
                            <p class="text-slate-500 font-medium">You haven't joined any classes.</p>
                        </div>
                    </div>
                </div>
            </div>
    </AuthenticatedLayout>
</template>
