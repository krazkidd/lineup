<script setup lang="ts">
import { useSortable } from '@vueuse/integrations/useSortable'

import { nanoid } from 'nanoid';

import type { Spot, Lineup, AppSettings } from '~~/types';

const lineup = useLocalStorage<Lineup>('lineup', {
    id: nanoid(),
    teamName: '',
    spots: []
}, {
    mergeDefaults: true
});
const appSettings = useLocalStorage<AppSettings>('app-settings', {
    isLineupLocked: false,
    jerseyColor: 'f47373',
    jerseyTextColor: '000000'
}, {
    mergeDefaults: true
});

const sortableContainer = ref<HTMLElement | null>(null);
useSortable(sortableContainer, lineup.value.spots, {
  group: 'spots',
  handle: '.drag-handle',
  animation: 150,
  onMove: () => !appSettings.value.isLineupLocked
});

function addSpot(spot: Spot) {
    if (!appSettings.value.isLineupLocked) {
        lineup.value.spots.push(spot);
    }
}
</script>

<template>
    <div class="p-5 rounded w-full md:w-3/4 xl:w-1/2">
        <header class="flex font-bold mb-4">
            <input
                type="text"
                v-model.trim="lineup.teamName"
                @keyup.enter="($event.target as HTMLInputElement).blur()"
                class="grow inline-block overflow-x-hidden text-ellipsis bg-transparent focus:shadow rounded text-gray-700 placeholder-gray-500 dark:text-gray-300 leading-[3em] cursor-pointer px-1"
                placeholder="Team Name"
            />

            <SettingsLockButton :is-locked="appSettings.isLineupLocked" @lock="appSettings.isLineupLocked = true" @unlock="appSettings.isLineupLocked = false" />

            <SettingsButton :app-settings="appSettings" />
        </header>

        <div ref="sortableContainer">
            <ClientOnly>
                <LineupSpot
                    v-for="spot in lineup.spots"
                    :key="spot.player.id"
                    :spot="spot"
                    :is-lineup-locked="appSettings.isLineupLocked"
                    :jersey-color="appSettings.jerseyColor"
                    :jersey-text-color="appSettings.jerseyTextColor"
                    @delete="lineup.spots = lineup.spots.filter(s => s.player.id !== $event)"
                    class="bg-blue-200"
                />
            </ClientOnly>
        </div>

        <footer>
            <LineupNewSpot @add="addSpot($event)" :class="`${ appSettings.isLineupLocked ? 'collapse' : 'visible' }`" />
        </footer>
    </div>
</template>

<style scoped>

</style>
