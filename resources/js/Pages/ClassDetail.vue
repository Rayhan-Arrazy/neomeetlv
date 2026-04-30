<script setup lang="ts">
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link } from '@inertiajs/vue3';
import { BookOpen, FileText, Download, Play, Video, Users, MessageSquare, Plus, ArrowLeft } from 'lucide-vue-next';

const props = defineProps<{
    course: any;
    materials: any[];
    meetings: any[];
}>();
</script>

<template>
    <Head :title="`Class: ${course.name}`" />

    <AuthenticatedLayout>
        <template #header>
            <div class="flex items-center gap-4">
                <Link :href="route('dashboard')" class="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400">
                    <ArrowLeft class="w-6 h-6" />
                </Link>
                <h2 class="text-2xl font-black text-white tracking-tight">
                    {{ course.name }}
                </h2>
            </div>
        </template>

        <div class="py-12">
            <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <!-- Left Column: Details & Materials -->
                    <div class="lg:col-span-2 space-y-8">
                        <!-- About Section -->
                        <div class="p-8 glass-card rounded-3xl">
                            <h3 class="text-xl font-bold text-white mb-4">About this Class</h3>
                            <p class="text-slate-400 leading-relaxed mb-6">{{ course.description }}</p>
                            
                            <div class="flex flex-wrap gap-4">
                                <div class="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400 text-sm font-bold flex items-center gap-2">
                                    <Users class="w-4 h-4" /> {{ course.instructor }}
                                </div>
                                <div class="px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400 text-sm font-bold flex items-center gap-2">
                                    <BookOpen class="w-4 h-4" /> {{ course.schedule }}
                                </div>
                            </div>
                        </div>

                        <!-- Materials Section -->
                        <div class="space-y-4">
                            <h3 class="text-xl font-bold text-white flex items-center gap-2">
                                <FileText class="w-5 h-5 text-indigo-500" />
                                Study Materials
                            </h3>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div v-for="i in 4" :key="i" class="p-4 glass-card rounded-2xl group hover:border-white/20 transition-all flex items-center justify-between">
                                    <div class="flex items-center gap-3">
                                        <div class="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center">
                                            <FileText class="w-5 h-5 text-indigo-500" />
                                        </div>
                                        <div>
                                            <div class="text-white font-bold text-sm">Lecture_Notes_Week_{{ i }}.pdf</div>
                                            <div class="text-xs text-slate-500">2.4 MB • PDF Document</div>
                                        </div>
                                    </div>
                                    <button class="p-2 text-slate-500 hover:text-white transition-colors">
                                        <Download class="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Right Column: Meetings & Participation -->
                    <div class="space-y-8">
                        <!-- Join Meeting Card -->
                        <div class="p-8 glass-card rounded-3xl border border-blue-500/30 bg-gradient-to-br from-blue-600/10 to-transparent">
                            <div class="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-600/20">
                                <Video class="w-8 h-8 text-white" />
                            </div>
                            <h3 class="text-2xl font-black text-white mb-2">Join Live Session</h3>
                            <p class="text-slate-400 text-sm mb-8">Participate in real-time discussions, share your screen, and collaborate with your instructor.</p>
                            
                            <Link 
                                v-if="meetings.length > 0"
                                :href="route('meetings.room', meetings[0].id)"
                                class="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 active:scale-95"
                            >
                                <Play class="w-5 h-5 fill-current" /> Join Meeting Now
                            </Link>
                            <div v-else class="text-center p-4 bg-white/5 rounded-2xl text-slate-500 text-sm font-medium italic">
                                No meetings scheduled right now.
                            </div>
                        </div>

                        <!-- Chat & Activity -->
                        <div class="p-8 glass-card rounded-3xl">
                            <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <MessageSquare class="w-5 h-5 text-purple-500" />
                                Class Activity
                            </h3>
                            <div class="space-y-4">
                                <div v-for="j in 3" :key="j" class="flex gap-3">
                                    <div class="w-8 h-8 rounded-full bg-slate-700 flex-shrink-0"></div>
                                    <div class="space-y-1">
                                        <div class="text-xs font-bold text-white">Student User {{ j }}</div>
                                        <div class="text-xs text-slate-400 p-3 bg-white/5 rounded-2xl rounded-tl-none">
                                            Looking forward to the lecture today!
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
