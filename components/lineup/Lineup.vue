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
    <div>
        <div class="flex font-bold mb-4">
            <input
                type="text"
                v-model.trim="appSettingsStore.teamName"
                @keyup.enter="($event.target as HTMLInputElement).blur()"
                class="grow inline-block overflow-x-hidden text-ellipsis bg-transparent focus:shadow rounded leading-[3em] cursor-pointer px-1"
                placeholder="Team Name"
                :disabled="appSettingsStore.isLocked"
            />

            <SettingsLockButton />

            <SettingsHelpButton />

            <SettingsButton />
        </div>

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

        <LineupNewSpot
            @add="appSettingsStore.addSpot($event)"
            :class="`${ appSettingsStore.isLocked ? 'collapse' : 'visible' }`"
            :num-players="numPlayers"
        />
    </div>
</template>

<style scoped>

</style>
