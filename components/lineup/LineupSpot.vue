<script setup lang="ts">
import type { ID, Spot } from '~~/types';
import { PositionOptions } from '~~/types';

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

const visible = ref(false);
</script>

<template>
    <div
        :title="`${props.spot.player.number ? '#' + props.spot.player.number + ' ' : null}${props.spot.player.name}`"
        class="flex leading-[3rem] space-x-2 rounded shadow-sm p-2 mb-2"
        @focus="focused = true"
        @blur="focused = false"
        tabindex="0"
    >
        <LineupDragHandle class="inline-block shrink-0 text-[1.3em] px-2" />

        <PlayerJersey :player="props.spot.player" class="shrink-0" />

        <div class="grow overflow-x-hidden text-ellipsis">
            {{ props.spot.player.name }}
        </div>

        <LineupPosition :position="props.spot.position" @click="visible = true" class="shrink-0 inline-block cursor-pointer hover:outline hover:outline-blue-950 bg-white rounded-full text-center w-[3em] p-1" />

        <Dialog v-model:visible="visible" modal :header="`${props.spot.player.name}'s Position`" class="!max-w-full !max-h-full">
            <Listbox
                v-model="props.spot.position"
                :options="PositionOptions"
                option-group-label="groupName"
                option-group-children="children"
                option-value="value"
                @change="visible = false"
                class="!w-full"
            >
                <template #option="{ option }">
                    <LineupPosition :position="option.value" class="shrink-0 inline-block cursor-pointer bg-white rounded-full text-center w-[3em] p-1" />
                    {{ option.longName }}
                </template>
            </Listbox>
        </Dialog>
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
