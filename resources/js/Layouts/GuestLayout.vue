<script setup lang="ts">
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import { Link } from '@inertiajs/vue3';
</script>

<template>
    <div
        class="flex min-h-screen flex-col items-center justify-center bg-slate-950 p-6 sm:pt-0 relative overflow-hidden"
    >
        <!-- Animated Background Blobs -->
        <div class="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>
        <div class="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full"></div>

        <div class="relative z-10">
            <Link href="/">
                <ApplicationLogo class="h-20 w-20 fill-current text-gray-500" :simple="true" />
            </Link>
        </div>

        <div
            class="relative z-10 mt-6 w-full overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 px-8 py-10 shadow-2xl sm:max-w-md sm:rounded-3xl"
        >
            <slot />
        </div>
    </div>
</template>
