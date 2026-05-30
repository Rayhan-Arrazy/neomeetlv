<script setup lang="ts">
import { ref } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import { LayoutDashboard, Video, Calendar, Settings, LogOut, BookOpen, Menu, X } from 'lucide-vue-next';

const isMobileMenuOpen = ref(false);
const page = usePage();
const user = page.props.auth.user;

const navigation = [
    { name: 'Dashboard', route: 'dashboard', icon: LayoutDashboard },
    { name: 'Meetings', route: 'dashboard', icon: Video },
    { name: 'Classes', route: 'dashboard', icon: BookOpen },
    { name: 'Schedule', route: 'dashboard', icon: Calendar },
];
</script>

<template>
    <div class="min-h-screen bg-slate-950 flex overflow-hidden text-slate-200 font-sans">
        <!-- Sidebar Navigation (Desktop) -->
        <nav class="hidden md:flex w-24 flex-col items-center py-8 glass-panel z-50 transition-all duration-300 hover:w-64 group relative">
            <!-- Logo -->
            <Link :href="route('dashboard')" class="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-12 shadow-lg shadow-blue-500/20 group-hover:w-full group-hover:rounded-xl group-hover:px-6 group-hover:justify-start group-hover:bg-transparent group-hover:shadow-none transition-all">
                <Video class="w-6 h-6 text-white shrink-0" />
                <span class="ml-3 font-black text-xl text-white opacity-0 group-hover:opacity-100 hidden group-hover:block transition-opacity whitespace-nowrap tracking-tight">NeoMeet</span>
            </Link>

            <!-- Nav Links -->
            <div class="flex-1 flex flex-col gap-4 w-full px-4">
                <Link v-for="item in navigation" :key="item.name" :href="route(item.route)" 
                      class="flex items-center w-full p-3 rounded-xl transition-all relative group/link"
                      :class="route().current(item.route) ? 'bg-blue-600/10 text-blue-500' : 'text-slate-400 hover:text-white hover:bg-white/5'">
                    <component :is="item.icon" class="w-6 h-6 shrink-0 mx-auto group-hover:mx-0 transition-all" />
                    <span class="ml-4 font-bold opacity-0 group-hover:opacity-100 hidden group-hover:block transition-opacity whitespace-nowrap">
                        {{ item.name }}
                    </span>
                    <!-- Active Indicator -->
                    <div v-if="route().current(item.route)" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-full"></div>
                </Link>
            </div>

            <!-- User Profile & Settings -->
            <div class="mt-auto flex flex-col gap-2 w-full px-4">
                <Link :href="route('profile.edit')" class="flex items-center w-full p-3 rounded-xl transition-all text-slate-400 hover:text-white hover:bg-white/5 group/link">
                    <Settings class="w-6 h-6 shrink-0 mx-auto group-hover:mx-0 transition-all" />
                    <span class="ml-4 font-bold opacity-0 group-hover:opacity-100 hidden group-hover:block transition-opacity whitespace-nowrap">Settings</span>
                </Link>
                
                <Link :href="route('logout')" method="post" as="button" class="flex items-center w-full p-3 rounded-xl transition-all text-red-400 hover:text-red-300 hover:bg-red-500/10 group/link">
                    <LogOut class="w-6 h-6 shrink-0 mx-auto group-hover:mx-0 transition-all" />
                    <span class="ml-4 font-bold opacity-0 group-hover:opacity-100 hidden group-hover:block transition-opacity whitespace-nowrap">Log Out</span>
                </Link>
                
                <div class="mt-6 pt-4 border-t border-white/5 flex items-center w-full px-2">
                    <div class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shrink-0 shadow-lg border border-white/10">
                        <span class="font-bold text-white text-sm">{{ user.name.charAt(0) }}</span>
                    </div>
                    <div class="ml-3 opacity-0 group-hover:opacity-100 hidden group-hover:block transition-opacity overflow-hidden">
                        <p class="font-bold text-white text-sm truncate">{{ user.name }}</p>
                        <p class="text-xs text-slate-500 truncate">{{ user.email }}</p>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Mobile Header -->
        <div class="md:hidden fixed top-0 left-0 w-full h-16 glass-panel z-50 flex items-center justify-between px-6 border-b border-white/5">
            <Link :href="route('dashboard')" class="flex items-center gap-2">
                <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Video class="w-4 h-4 text-white" />
                </div>
                <span class="font-black text-lg text-white tracking-tight">NeoMeet</span>
            </Link>
            <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="text-slate-400 hover:text-white p-2 bg-white/5 rounded-xl">
                <Menu v-if="!isMobileMenuOpen" class="w-5 h-5" />
                <X v-else class="w-5 h-5" />
            </button>
        </div>

        <!-- Mobile Menu -->
        <div v-if="isMobileMenuOpen" class="md:hidden fixed inset-0 z-40 bg-slate-950/98 backdrop-blur-3xl pt-24 px-6 pb-6 flex flex-col">
            <div class="flex-1 flex flex-col gap-3">
                <Link v-for="item in navigation" :key="item.name" :href="route(item.route)" 
                      class="flex items-center p-4 rounded-2xl transition-all border border-transparent"
                      :class="route().current(item.route) ? 'bg-blue-600/10 border-blue-500/20 text-blue-400' : 'text-slate-300 hover:text-white hover:bg-white/5'">
                    <component :is="item.icon" class="w-6 h-6" />
                    <span class="ml-4 font-bold text-lg">{{ item.name }}</span>
                </Link>
            </div>
            
            <div class="mt-auto pt-6 border-t border-white/10 space-y-3">
                <div class="flex items-center gap-4 p-4 bg-white/5 rounded-2xl mb-4 border border-white/5">
                    <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                        <span class="font-bold text-white text-lg">{{ user.name.charAt(0) }}</span>
                    </div>
                    <div>
                        <p class="font-bold text-white">{{ user.name }}</p>
                        <p class="text-sm text-slate-400">{{ user.email }}</p>
                    </div>
                </div>
                
                <Link :href="route('profile.edit')" class="flex items-center p-4 rounded-2xl text-slate-300 hover:text-white hover:bg-white/5 transition-all">
                    <Settings class="w-6 h-6" />
                    <span class="ml-4 font-bold">Profile Settings</span>
                </Link>
                <Link :href="route('logout')" method="post" as="button" class="flex items-center w-full p-4 rounded-2xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all">
                    <LogOut class="w-6 h-6" />
                    <span class="ml-4 font-bold">Log Out</span>
                </Link>
            </div>
        </div>

        <!-- Main Content -->
        <main class="flex-1 overflow-y-auto relative w-full pt-16 md:pt-0">
            <!-- Background Orbs for aesthetics -->
            <div class="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
            <div class="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
            
            <div class="h-full">
                <!-- If there is a header slot, render it completely differently, or omit it since we style it in the page -->
                <slot />
            </div>
        </main>
    </div>
</template>
