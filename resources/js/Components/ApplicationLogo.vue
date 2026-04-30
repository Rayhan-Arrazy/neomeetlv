<template>
    <div class="flex items-center gap-3">
        <div class="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/20">
            <span class="text-xl font-bold text-white">N</span>
        </div>
        <span class="text-xl font-bold tracking-tight text-white" v-if="!$attrs.simple">NeoMeet</span>
    </div>
</template>
