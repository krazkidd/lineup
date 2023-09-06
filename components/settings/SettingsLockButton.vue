<script setup lang="ts">
const props = defineProps<{
  isLocked: boolean
}>();

const emit = defineEmits<{
  (e: "lock"): void;
  (e: "unlock"): void;
}>();

const isLocked = ref(props.isLocked);

function handleClick(): void {
  isLocked.value = !isLocked.value;

  if (isLocked.value) {
    emit('lock');
  } else {
    emit('unlock');
  }
}
</script>

<template>
  <Button
      @click="handleClick"
      :icon="`pi pi-${ isLocked ? 'lock' : 'lock-open' }`"
      :severity="`${ isLocked ? 'secondary' : 'warning' }`"
      text
      rounded
      :aria-label="`${ isLocked ? 'Unlock lineup' : 'Lock lineup' }`"
      :title="`${ isLocked ? 'Unlock lineup' : 'Lock lineup' }`"
  />
</template>
