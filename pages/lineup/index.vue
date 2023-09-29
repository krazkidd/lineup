<script setup lang="ts">
import { useSortable } from '@vueuse/integrations/useSortable';

import { useTeamStore } from '~~/stores/Team';
import { getTeam, setTeamName } from '~~/db/Team';
import { getLineup, setLineup, addSpot, removeSpot } from '~~/db/Lineup';
import type { Lineup } from '~~/types';

const db = useFirestore();

const teamStore = useTeamStore();

const { data: team } = useDocument(await getTeam(db, teamStore.id));
const { data: lineup } = useDocument(await getLineup(db, teamStore.id));

const spots = computed<Lineup>({
    get: () => lineup.value?.spots ?? [],
    set: (v) => setLineup(v)
});

const sortableContainer = ref<HTMLElement | null>(null);
useSortable(sortableContainer, spots, {
  group: 'spots',
  handle: '.drag-handle',
  animation: 150,
  onMove: () => !teamStore.isLocked
});
</script>

<template>
    <div>
        <div class="flex font-bold mb-4">
            <input
                type="text"
                :value="team?.name"
                @input="setTeamName(($event.target!.value as string).trim())"
                @keyup.enter="($event.target as HTMLInputElement).blur()"
                :class="{ 'cursor-pointer': !teamStore.isLocked }"
                class="grow inline-block overflow-x-hidden text-ellipsis bg-transparent focus:shadow rounded px-1"
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
                    v-for="spot in lineup?.spots"
                    :key="spot.player.id"
                    :spot="spot"
                    @delete="!teamStore.isLocked && removeSpot(lineup!.spots, $event)"
                    class="accent"
                />
            </ClientOnly>
        </div>

        <LineupNewSpot
            @add="!teamStore.isLocked && addSpot(lineup!.spots, $event)"
            :class="`${ teamStore.isLocked ? 'collapse' : 'visible' }`"
            :num-players="spots.length"
        />
    </div>
</template>

<style scoped>

</style>
