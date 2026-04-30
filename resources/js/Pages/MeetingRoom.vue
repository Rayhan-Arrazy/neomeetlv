<script setup lang="ts">
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, usePage } from '@inertiajs/vue3';
import { onMounted, ref, onBeforeUnmount } from 'vue';
import { Video, Mic, ScreenShare, MessageSquare, Users, Settings, X, PhoneOff } from 'lucide-vue-next';

const props = defineProps<{
    meeting: {
        id: number;
        title: string;
        meeting_link: string;
    }
}>();

const jitsiContainer = ref<HTMLElement | null>(null);
let jitsiApi: any = null;

onMounted(() => {
    const domain = "meet.jit.si";
    const options = {
        roomName: `NeoMeet_${props.meeting.id}_${Math.random().toString(36).substring(7)}`,
        width: '100%',
        height: '100%',
        parentNode: jitsiContainer.value,
        configOverwrite: {
            startWithAudioMuted: true,
            disableModeratorIndicator: true,
            startScreenSharing: false,
            enableEmailInStats: false,
        },
        interfaceConfigOverwrite: {
            TOOLBAR_BUTTONS: [
                'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
                'fms', 'hangup', 'profile', 'chat', 'recording',
                'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
                'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
                'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone',
                'security'
            ],
        },
        userInfo: {
            displayName: usePage().props.auth.user.name,
            email: usePage().props.auth.user.email
        }
    };
    
    // Load Jitsi Script
    const script = document.createElement('script');
    script.src = `https://${domain}/external_api.js`;
    script.async = true;
    script.onload = () => {
        // @ts-ignore
        jitsiApi = new window.JitsiMeetExternalAPI(domain, options);
    };
    document.head.appendChild(script);
});

onBeforeUnmount(() => {
    if (jitsiApi) {
        jitsiApi.dispose();
    }
});

const leaveMeeting = () => {
    if (confirm('Are you sure you want to leave the meeting?')) {
        window.history.back();
    }
};
</script>

<template>
    <Head :title="`Meeting: ${meeting.title}`" />

    <div class="h-screen flex flex-col bg-slate-950 overflow-hidden">
        <!-- Meeting Header -->
        <div class="h-16 flex items-center justify-between px-6 bg-slate-900/50 backdrop-blur-xl border-b border-white/5 z-50">
            <div class="flex items-center gap-4">
                <div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                    <Video class="w-5 h-5 text-white" />
                </div>
                <div>
                    <h1 class="text-white font-bold">{{ meeting.title }}</h1>
                    <div class="flex items-center gap-2">
                        <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span class="text-xs text-slate-400 font-medium uppercase tracking-widest">Live Now</span>
                    </div>
                </div>
            </div>

            <div class="flex items-center gap-3">
                <button @click="leaveMeeting" class="px-5 py-2 bg-red-600 hover:bg-red-500 text-white text-sm font-bold rounded-full transition-all flex items-center gap-2 active:scale-95">
                    <PhoneOff class="w-4 h-4" /> End Meeting
                </button>
            </div>
        </div>

        <!-- Jitsi Container -->
        <div class="flex-1 relative bg-slate-900">
            <div ref="jitsiContainer" class="absolute inset-0 w-full h-full"></div>
            
            <!-- Loading Overlay -->
            <div v-if="!jitsiApi" class="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 z-10">
                <div class="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p class="text-slate-400 font-bold animate-pulse uppercase tracking-widest text-sm">Initializing Secure Connection...</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
:deep(.watermark) {
    display: none !important;
}
</style>
