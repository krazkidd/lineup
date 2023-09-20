<script setup lang="ts">
import { useSortable } from '@vueuse/integrations/useSortable'

import { useTeamStore } from '~~/stores/Team'

const teamStore = useTeamStore();

const sortableContainer = ref<HTMLElement | null>(null);
useSortable(sortableContainer, teamStore.spots, {
  group: 'spots',
  handle: '.drag-handle',
  animation: 150,
  onMove: () => !teamStore.isLocked
});

const numPlayers = computed(() => teamStore.spots.length);
</script>

<template>
    <div>
        <div class="flex font-bold mb-4">
            <input
                type="text"
                v-model.trim="teamStore.teamName"
                @keyup.enter="($event.target as HTMLInputElement).blur()"
                class="grow inline-block overflow-x-hidden text-ellipsis bg-transparent focus:shadow rounded cursor-pointer px-1"
                placeholder="Team Name"
                :disabled="teamStore.isLocked"
            />

            <SettingsLockButton />

            <SettingsHelpButton />

            <SettingsButton />
        </div>

        <div ref="sortableContainer">
            <ClientOnly>
                <LineupSpot
                    v-for="spot in teamStore.spots"
                    :key="spot.player.id"
                    :spot="spot"
                    @delete="teamStore.removeSpot($event)"
                    class="bg-blue-200"
                />
            </ClientOnly>
        </div>

        <LineupNewSpot
            @add="teamStore.addSpot($event)"
            :class="`${ teamStore.isLocked ? 'collapse' : 'visible' }`"
            :num-players="numPlayers"
        />
    </div>
</template>

<style scoped>

</style>
