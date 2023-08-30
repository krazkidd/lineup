<script setup lang="ts">
import type { Player, ID } from '~~/types';

const props = defineProps<{
    player: Player
}>();

const emit = defineEmits<{
    (e: 'delete', payload: ID): void
}>();

const focused = ref(false);
onKeyStroke("Backspace", (e) => {
    if (focused.value) {
        emit('delete', props.player.id);
    }
});
</script>

<template>
    <div
        :title="`${player.number} ${player.name}`"
        class="spot p-2 mb-2 rounded shadow-sm max-w-[250px] flex"
        @focus="focused = true"
        @blur="focused = false"
        tabindex="0"
    >
        <LineupDragHandle class="pr-2" />
        <span>
            {{ player.number }} {{ player.name }}
        </span>
    </div>
</template>

<style scoped lang="PostCSS">
/* .sortable-chosen .spot {

} */

.sortable-drag .spot {
    transform: rotate(5deg);
}

.sortable-ghost .spot {
    position: relative;
}

.sortable-ghost .spot::after {
    @apply absolute top-0 bottom-0 left-0 right-0 bg-slate-300 rounded;
    content: "";
}

.spot:focus,
.spot:focus-visible {
    @apply outline-gray-400 !important;
    outline: gray auto 1px;
}
</style>
