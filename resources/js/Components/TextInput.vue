<script setup lang="ts">
import { onMounted, ref } from 'vue';

const model = defineModel<string>({ required: true });

const input = ref<HTMLInputElement | null>(null);

onMounted(() => {
    if (input.value?.hasAttribute('autofocus')) {
        input.value?.focus();
    }
});

defineExpose({ focus: () => input.value?.focus() });
</script>

<template>
    <input
        class="bg-white/5 border-white/10 text-white focus:border-blue-500/50 focus:ring-blue-500/50 rounded-full shadow-sm backdrop-blur-sm transition-all duration-300 placeholder:text-slate-500"
        v-model="model"
        ref="input"
    />
</template>
