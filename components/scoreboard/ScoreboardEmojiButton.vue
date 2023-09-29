<script setup lang="ts">
import { emojiTitles } from '~~/data/emoji';

const props = defineProps<{
    id: string
}>();

const emit = defineEmits<{
  (e: "emote", payload: string): void;
}>();

const emojiTitle = computed(() => emojiTitles[props.id]);
</script>

<template>
    <button type="button" @click="emit('emote', props.id)" class="mb-2">
        <img
            :src="`/lineup/images/fluentui-emoji/${props.id}_color.svg`"
            :alt="emojiTitle"
            :title="emojiTitle"
        />
    </button>
</template>