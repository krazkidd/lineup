<script setup lang="ts">
import { useTeamStore } from '~~/stores/Team';
import { getTeam } from '~~/db/Team';
import { getLineup, updateSpot } from '~~/db/Lineup';
import type { Spot } from '~~/types';

const db = useFirestore();

const teamStore = useTeamStore();

const { data: team } = useDocument(await getTeam(db, teamStore.id));
const { data: lineup } = useDocument(await getLineup(db, teamStore.id));

const props = defineProps<{
    spot: Spot,
    size: string
}>();

const isDialogVisible = ref(false);
</script>

<template>
    <div @click="isDialogVisible = true">
        <svg viewBox="215 45 526.2 372.045" :width="props.size" :height="props.size" xmlns="http://www.w3.org/2000/svg">
            <use x="-308.27" href="@/assets/images/cloth-t-shirt.svg#shirt-back" :fill="`#${ team?.jerseyColor }`" />

            <text v-if="props.spot.player.number.length === 1" x="445" y="200" font-size="10em" font-weight="bold" :fill="`#${ team?.jerseyTextColor }`">{{ props.spot.player.number }}</text>
            <text v-else-if="props.spot.player.number.length === 2" x="390" y="200" font-size="10em" font-weight="bold" :fill="`#${ team?.jerseyTextColor }`">{{ props.spot.player.number }}</text>
            <text v-else-if="props.spot.player.number.length === 3" x="370" y="200" font-size="8.5em" font-weight="bold" :fill="`#${ team?.jerseyTextColor }`">{{ props.spot.player.number }}</text>
        </svg>

        <Dialog
            v-model:visible="isDialogVisible"
            modal
            :header="`${props.spot.player.name}'s Number`"
            :pt="{
                root: { class: 'w-full md:w-3/4 xl:w-1/2' },
                content: { class: 'pt-1' }
            }"
        >
            <div class="flex flex-column gap-2">
                <InputText
                    type="text"
                    :model-value="props.spot.player.number"
                    @update:model-value="updateSpot(lineup!.spots, { player: { ...props.spot.player, number: $event }, position: props.spot.position })"
                    @keyup.enter="isDialogVisible = false"
                    :pt="{
                        root: { class: '!w-full' },
                        item: { class: 'leading-8' }
                    }"
                    aria-describedby="player-number-help"
                />
                <small id="player-number-help">Enter up to 3 characters.</small>
            </div>
        </Dialog>
    </div>
</template>
