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

        <input
            type="text"
            v-model.trim="props.spot.player.name"
            @keyup.enter="($event.target as HTMLInputElement).blur()"
            class="grow inline-block overflow-x-hidden text-ellipsis bg-transparent focus:shadow rounded cursor-pointer px-1"
        />

        <LineupPosition :position="props.spot.position" @click="visible = true" class="shrink-0 inline-block cursor-pointer hover:outline hover:outline-blue-950 bg-white text-black rounded-full text-center w-[3em]" />

        <Dialog
            v-model:visible="visible"
            modal
            :header="`${props.spot.player.name}'s Position`"
            :pt="{
                root: { class: '!max-h-full w-full md:w-3/4 xl:w-1/2' }
            }"
        >
            <Listbox
                v-model="props.spot.position"
                :options="PositionOptions"
                option-group-label="groupName"
                option-group-children="children"
                option-value="value"
                @change="visible = false"
                :pt="{
                    item: { class: 'leading-8' }
                }"
            >
                <template #option="{ option }">
                    <LineupPosition :position="option.value" class="shrink-0 inline-block cursor-pointer bg-white text-black rounded-full text-center w-8" />
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
