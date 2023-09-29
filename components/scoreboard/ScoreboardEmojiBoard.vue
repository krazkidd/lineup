<script setup lang="ts">
import { emojis } from '~~/data/emoji';

const emit = defineEmits<{
  (e: "emote", payload: string): void;
}>();
</script>

<template>
    <div class="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-10 justify-items-center md:w-128 gap-1">
        <ScoreboardEmojiButton
            v-for="emoji of emojis"
            :key="emoji"
            :id="emoji"
            @emote="emit('emote', $event)"
        />
    </div>
</template>