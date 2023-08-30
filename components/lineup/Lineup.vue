<script setup lang="ts">
import { nanoid } from 'nanoid';
import draggable from 'vuedraggable';

import type { Spot, Lineup } from '~~/types';

const lineup = useLocalStorage<Lineup>('lineup', {
    id: nanoid(),
    teamName: '',
    spots: []
});
</script>

<template>
    <div class="lineup bg-gray-200 p-5 rounded min-w-[250px]">
        <header class="font-bold mb-4">
            <input
                type="text"
                v-model="lineup.teamName"
                @keyup.enter="($event.target as HTMLInputElement).blur()"
                class="team-name-input bg-transparent focus:bg-white rounded px-1 w-4/5"
            />
        </header>

        <draggable
            v-model="lineup.spots"
            item-key="player.id"
            handle=".drag-handle"
            :group="{ name: 'spots' }"
            :animation="150"
        >
            <template #item="{ element: spot }: { element: Spot }">
                <div>
                    <LineupSpot :spot="spot" @delete="lineup.spots = lineup.spots.filter(s => s.player.id !== $event)" />
                </div>
            </template>
        </draggable>

        <footer>
            <LineupNewSpot @add="lineup.spots.push($event)" />
        </footer>
    </div>
</template>

<style scoped>

</style>
