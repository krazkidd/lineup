<script lang="ts" setup>
import type { Position } from '~~/types';
import { getPositionShortName, getPositionLongName } from '~~/types';

const props = defineProps<{
    position: Position
}>();

const positionShortName = computed(() => getPositionShortName(props.position));
const positionLongName = computed(() => getPositionLongName(props.position));
</script>


<template>
  <span :title="positionLongName">
    {{ positionShortName }}
  </span>
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