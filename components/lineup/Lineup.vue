<script setup lang="ts">
import { useSortable } from '@vueuse/integrations/useSortable'

import { useAppSettingsStore } from '~~/stores/AppSettings'

const appSettingsStore = useAppSettingsStore();

const sortableContainer = ref<HTMLElement | null>(null);
useSortable(sortableContainer, appSettingsStore.spots, {
  group: 'spots',
  handle: '.drag-handle',
  animation: 150,
  onMove: () => !appSettingsStore.isLocked
});

const numPlayers = computed(() => appSettingsStore.spots.length);
</script>

<template>
    <div class="p-5 rounded w-full md:w-3/4 xl:w-1/2">
        <header class="flex font-bold mb-4">
            <input
                type="text"
                v-model.trim="appSettingsStore.teamName"
                @keyup.enter="($event.target as HTMLInputElement).blur()"
                class="grow inline-block overflow-x-hidden text-ellipsis bg-transparent focus:shadow rounded text-gray-700 placeholder-gray-500 dark:text-gray-300 leading-[3em] cursor-pointer px-1"
                placeholder="Team Name"
                :disabled="appSettingsStore.isLocked"
            />

            <SettingsLockButton />

            <SettingsHelpButton />

            <SettingsButton />
        </header>

        <div ref="sortableContainer">
            <ClientOnly>
                <LineupSpot
                    v-for="spot in appSettingsStore.spots"
                    :key="spot.player.id"
                    :spot="spot"
                    @delete="appSettingsStore.removeSpot($event)"
                    class="bg-blue-200"
                />
            </ClientOnly>
        </div>

        <footer>
            <LineupNewSpot
                @add="appSettingsStore.addSpot($event)"
                :class="`${ appSettingsStore.isLocked ? 'collapse' : 'visible' }`"
                :num-players="numPlayers"
            />
        </footer>
    </div>
</template>

<style scoped>

</style>
