<script lang="ts" setup>
import { useTeamStore } from '~~/stores/Team';
import { getLineup, updateSpot } from '~~/db/Lineup';
import type { Spot } from '~~/types';
import { PositionOptions, getPositionShortName, getPositionLongName } from '~~/types';

const db = useFirestore();

const teamStore = useTeamStore();

const { data: lineup } = useDocument(await getLineup(db, teamStore.id));

const props = defineProps<{
  spot: Spot
}>();

const isDialogVisible = ref(false);

const positionShortName = computed(() => getPositionShortName(props.spot.position));
const positionLongName = computed(() => getPositionLongName(props.spot.position));
</script>

<template>
    <div @click="isDialogVisible = true">
        <span :title="positionLongName">
          {{ positionShortName }}
        </span>

        <Dialog
            v-model:visible="isDialogVisible"
            modal
            :header="`${props.spot.player.name}'s Position`"
            :pt="{
                root: { class: 'h-full md:h-4/5 w-full md:w-3/4 xl:w-1/2' },
            }"
        >
            <Listbox
                :model-value="props.spot.position"
                @update:model-value="updateSpot(lineup!.spots, { ...props.spot, position: $event })"
                :options="PositionOptions"
                option-group-label="groupName"
                option-group-children="children"
                option-value="value"
                @change="isDialogVisible = false"
                :pt="{
                    root: { class: '!w-full' },
                }"
            >
                <template #option="{ option }">
                    <span :title="option.longName" class="inline-block bg-white text-gray-800 rounded-full text-center w-[2em]">
                        {{ option.shortName }}
                    </span>

                    {{ option.longName }}
                </template>
            </Listbox>
        </Dialog>
    </div>
</template>

<!-- <style scoped>
.square-box {
  display: inline-block;
  position: relative;
  width: 3em;
  overflow: hidden;
  @apply bg-gray-700;
}

.square-box:before {
  content: "";
  display: block;
  padding-top: 100%;
}

.square-content {
  display: inline-block;
  position:  absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  color: white;
  text-align: center;
}
</style> -->