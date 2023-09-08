<script lang="ts" setup>
import type { Spot } from '~~/types';
import { PositionOptions, getPositionShortName, getPositionLongName } from '~~/types';

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
                content: { class: 'pt-1' }
            }"
        >
          <Listbox
                v-model="props.spot.player.number"
                :options="PositionOptions"
                option-group-label="groupName"
                option-group-children="children"
                option-value="value"
                @change="isDialogVisible = false"
                :pt="{
                    root: { class: '!w-full' },
                    item: { class: 'leading-8' }
                }"
            >
                <template #option="{ option }">
                    <LineupPosition :position="option.value" class="shrink-0 inline-block cursor-pointer bg-white text-black rounded-full text-center w-8" />
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