<script setup lang="ts">
import { useAppSettingsStore } from '~~/stores/AppSettings'

const appSettingsStore = useAppSettingsStore();

const buttonPassThroughOptions = {
  label: {
    class: 'hidden'
  }
};
</script>

<template>
  <Button
    @click="appSettingsStore.isLocked = !appSettingsStore.isLocked"
    :icon="`pi pi-${ appSettingsStore.isLocked ? 'lock' : 'lock-open' }`"
    :severity="`${ appSettingsStore.isLocked ? 'secondary' : 'warning' }`"
    text
    rounded
    :aria-label="`${ appSettingsStore.isLocked ? 'Unlock lineup' : 'Lock lineup' }`"
    :title="`${ appSettingsStore.isLocked ? 'Unlock lineup' : 'Lock lineup' }`"
    :pt="buttonPassThroughOptions"
  />
</template>
