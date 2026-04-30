<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import { User, Lightbulb, Users, ArrowRight, Calendar, Video, Clock } from 'lucide-vue-next';

defineProps<{
    canLogin?: boolean;
    canRegister?: boolean;
}>();
</script>

<template>
    <Head title="Welcome" />
    
    <div class="relative min-h-screen overflow-hidden">
        <!-- Animated Background Blobs -->
        <div class="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full animate-pulse"></div>
        <div class="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full animate-pulse" style="animation-delay: 2s"></div>

        <!-- Navigation -->
        <nav class="relative z-10 flex items-center justify-between px-6 py-8 mx-auto max-w-7xl">
            <div class="flex items-center gap-3">
                <div class="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg shadow-blue-500/20">
                    <span class="text-2xl font-bold text-white">N</span>
                </div>
                <span class="text-2xl font-bold tracking-tight text-white">NeoMeet</span>
            </div>
            
            <div class="flex items-center gap-4">
                <Link v-if="canLogin" href="/login" class="px-6 py-2.5 text-sm font-medium text-slate-300 hover:text-white transition-colors">
                    Login
                </Link>
                <Link v-if="canRegister" href="/register" class="px-6 py-2.5 bg-white text-slate-950 rounded-full text-sm font-bold hover:bg-slate-200 transition-all active:scale-95">
                    Get Started
                </Link>
            </div>
        </nav>

        <!-- Hero Section -->
        <main class="relative z-10 flex flex-col items-center justify-center px-6 pt-20 pb-32 mx-auto text-center max-w-7xl">
            <div class="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-medium border rounded-full bg-white/5 border-white/10 text-blue-400 backdrop-blur-sm">
                <span class="relative flex h-2 w-2">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                New: AI-Powered Scheduling is here
            </div>

            <h1 class="max-w-4xl mb-8 text-6xl font-black tracking-tight text-white md:text-8xl">
                Connect. <span class="text-gradient">Learn.</span> <br />Collaborate.
            </h1>
            
            <p class="max-w-2xl mb-12 text-lg leading-relaxed text-slate-400 md:text-xl">
                The next-generation meeting and scheduling platform built for modern teams.
                Experience a unified workspace for your classes, meetings, and shared success.
            </p>

            <div class="flex flex-col gap-4 sm:flex-row">
                <Link href="/register" class="flex items-center justify-center gap-2 px-10 py-5 text-lg font-bold text-white transition-all bg-blue-600 rounded-full glass-button hover:bg-blue-500 shadow-xl shadow-blue-600/20">
                    Start for Free
                    <ArrowRight class="w-5 h-5" />
                </Link>
                <Link href="/demo" class="flex items-center justify-center gap-2 px-10 py-5 text-lg font-bold text-white transition-all rounded-full border border-white/10 hover:bg-white/5 backdrop-blur-sm">
                    View Demo
                </Link>
            </div>

            <!-- Features Grid -->
            <div class="grid grid-cols-1 gap-6 mt-32 md:grid-cols-3">
                <div class="p-8 text-left glass-card rounded-3xl group hover:border-blue-500/50 transition-colors">
                    <div class="w-14 h-14 mb-6 bg-blue-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Calendar class="w-7 h-7 text-blue-500" />
                    </div>
                    <h3 class="mb-3 text-xl font-bold text-white">Smart Scheduling</h3>
                    <p class="text-slate-400 leading-relaxed">AI-driven time slots that work for everyone in your team, automatically.</p>
                </div>
                
                <div class="p-8 text-left glass-card rounded-3xl group hover:border-indigo-500/50 transition-colors">
                    <div class="w-14 h-14 mb-6 bg-indigo-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Video class="w-7 h-7 text-indigo-500" />
                    </div>
                    <h3 class="mb-3 text-xl font-bold text-white">Virtual Classrooms</h3>
                    <p class="text-slate-400 leading-relaxed">Integrated video conferencing with whiteboard and collaborative tools.</p>
                </div>

                <div class="p-8 text-left glass-card rounded-3xl group hover:border-purple-500/50 transition-colors">
                    <div class="w-14 h-14 mb-6 bg-purple-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Users class="w-7 h-7 text-purple-500" />
                    </div>
                    <h3 class="mb-3 text-xl font-bold text-white">Team Management</h3>
                    <p class="text-slate-400 leading-relaxed">Easily manage roles, permissions, and attendance in one unified dashboard.</p>
                </div>
            </div>
        </main>

        <!-- Stats Section -->
        <section class="border-t border-white/5 bg-slate-950/50 backdrop-blur-md">
            <div class="px-6 py-20 mx-auto max-w-7xl">
                <div class="grid grid-cols-2 gap-8 md:grid-cols-4 text-center">
                    <div>
                        <div class="text-4xl font-black text-white mb-1">10k+</div>
                        <div class="text-sm text-slate-500 uppercase tracking-widest font-bold">Active Users</div>
                    </div>
                    <div>
                        <div class="text-4xl font-black text-white mb-1">500k+</div>
                        <div class="text-sm text-slate-500 uppercase tracking-widest font-bold">Meetings Held</div>
                    </div>
                    <div>
                        <div class="text-4xl font-black text-white mb-1">99.9%</div>
                        <div class="text-sm text-slate-500 uppercase tracking-widest font-bold">Uptime</div>
                    </div>
                    <div>
                        <div class="text-4xl font-black text-white mb-1">24/7</div>
                        <div class="text-sm text-slate-500 uppercase tracking-widest font-bold">Support</div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
.text-gradient {
    background: linear-gradient(to right, #60a5fa, #818cf8, #a78bfa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
</style>
