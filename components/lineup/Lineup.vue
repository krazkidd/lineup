<script setup lang="ts">
import { useSortable } from '@vueuse/integrations/useSortable'

import { nanoid } from 'nanoid';

import type { Spot, Lineup } from '~~/types';

const lineup = useLocalStorage<Lineup>('lineup', {
    id: nanoid(),
    teamName: '',
    spots: []
});

const sortableContainer = ref<HTMLElement | null>(null);
useSortable(sortableContainer, lineup.value.spots, {
  group: 'spots',
  handle: '.drag-handle',
  animation: 150
});
</script>

<template>
    <div class="lineup p-5 rounded max-w-[50vw]">
        <header class="font-bold mb-4">
            <input
                type="text"
                v-model="lineup.teamName"
                @keyup.enter="($event.target as HTMLInputElement).blur()"
                class="team-name-input bg-transparent focus:bg-white rounded px-1 w-4/5"
            />
        </header>

        <div ref="sortableContainer">
            <LineupSpot
                v-for="spot in lineup.spots"
                :key="spot.player.id"
                :spot="spot"
                @delete="lineup.spots = lineup.spots.filter(s => s.player.id !== $event)"
                class="bg-blue-200"
            />
        </div>

        <footer>
            <LineupNewSpot @add="lineup.spots.push($event)" />
        </footer>
    </div>
</template>

<style scoped>

</style>
