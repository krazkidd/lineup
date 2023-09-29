<script setup lang="ts">
import { useTeamStore } from '~~/stores/Team'

import type { ID, Spot } from '~~/types';

const teamStore = useTeamStore();

const props = defineProps<{
    spot: Spot,
}>();

const emit = defineEmits<{
    (e: 'delete', payload: ID): void
}>();

const focused = ref(false);
onKeyStroke("Backspace", (e) => {
    if (focused.value && !teamStore.isLocked) {
        emit('delete', props.spot.player.id);
    }
});
</script>

<template>
    <div
        :title="`${props.spot.player.number ? '#' + props.spot.player.number + ' ' : null}${props.spot.player.name}`"
        class="flex leading-[3rem] space-x-2 rounded shadow-sm p-2 mb-2"
        @focus="focused = true"
        @blur="focused = false"
        tabindex="0"
    >
        <LineupDragHandle :class="`${ teamStore.isLocked ? 'collapse' : 'visible' } inline-block shrink-0 text-[1.3em] px-2`" />

        <LineupJerseyButton
            :spot="props.spot"
            :size="'3em'"
            :class="{ 'cursor-pointer': !teamStore.isLocked, 'pointer-events-none': teamStore.isLocked }"
            class="shrink-0 inline-block hover:outline hover:outline-blue-950 rounded-full w-[3em]"
            :disabled="teamStore.isLocked"
        />

        <input
            type="text"
            v-model.trim="props.spot.player.name"
            @keyup.enter="($event.target as HTMLInputElement).blur()"
            :class="{ 'cursor-pointer': !teamStore.isLocked }"
            class="grow inline-block overflow-x-hidden text-ellipsis bg-transparent focus:shadow rounded placeholder-gray-500 dark:placeholder-gray-500 px-1"
            placeholder="Enter player name"
            :disabled="teamStore.isLocked"
        />

        <LineupPositionButton
            :spot="props.spot"
            class="shrink-0 inline-block cursor-pointer hover:outline hover:outline-blue-950 text-gray-800 bg-white rounded-full text-center w-[3em]"
        />
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
