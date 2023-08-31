<script setup lang="ts">
import type { ID, Spot } from '~~/types';

const props = defineProps<{
    spot: Spot
}>();

const emit = defineEmits<{
    (e: 'delete', payload: ID): void
}>();

const focused = ref(false);
onKeyStroke("Backspace", (e) => {
    if (focused.value) {
        emit('delete', props.spot.player.id);
    }
});
</script>

<template>
    <div
        :title="`${props.spot.player.number} ${props.spot.player.name}`"
        class="flex rounded p-2 mb-2 shadow-sm"
        @focus="focused = true"
        @blur="focused = false"
        tabindex="0"
    >
        <div>
            <LineupDragHandle class="leading-[3rem] text-[1.3em] align-middle px-2" />
        </div>

        <PlayerJersey :player="props.spot.player" />

        <div class="grow">
            <span class="leading-[3rem] px-2">
                {{ props.spot.player.name }}
            </span>
        </div>

        <div>
            <span class="leading-[3rem] bg-white rounded-full p-1">
                {{ props.spot.position }}
            </span>
        </div>
    </div>
</template>

<style scoped>
/* .sortable-chosen {

} */

/* .sortable-drag {

} */

.sortable-ghost {
    @apply blur-sm bg-slate-300;
}

:focus,
:focus-visible {
    /* HACK: It appears we have to set the outline style
     *       to show focused div on *mouse click*,
     *       though Firefox ignores the color.
     */
    /* @apply outline-gray-400 !important; */
    outline: gray auto 1px;
}
</style>
