<script setup lang="ts">
import { useSortable } from '@vueuse/integrations/useSortable'

import { nanoid } from 'nanoid';

import type { Lineup } from '~~/types';

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
    <div class="p-5 rounded w-full md:w-3/4 xl:w-1/2">
        <header class="font-bold mb-4">
            <input
                type="text"
                v-model.trim="lineup.teamName"
                @keyup.enter="($event.target as HTMLInputElement).blur()"
                class="bg-transparent focus:shadow rounded text-gray-700 placeholder-gray-500 dark:text-gray-500 dark:placeholder-gray-300 leading-tight cursor-pointer mb-3 px-1 py-2"
                placeholder="Team Name"
            />
        </header>

        <div ref="sortableContainer">
            <ClientOnly>
                <LineupSpot
                    v-for="spot in lineup.spots"
                    :key="spot.player.id"
                    :spot="spot"
                    @delete="lineup.spots = lineup.spots.filter(s => s.player.id !== $event)"
                    class="bg-blue-200"
                />
            </ClientOnly>
        </div>

        <footer>
            <LineupNewSpot @add="lineup.spots.push($event)" />
        </footer>
    </div>
</template>

<style scoped>

</style>
