<script setup lang="ts">
import { useAppSettingsStore } from '~~/stores/AppSettings'

const appSettingsStore = useAppSettingsStore();
</script>

<template>
  <Button
      @click="appSettingsStore.setIsLocked(!appSettingsStore.getIsLocked)"
      :icon="`pi pi-${ appSettingsStore.getIsLocked ? 'lock' : 'lock-open' }`"
      :severity="`${ appSettingsStore.getIsLocked ? 'secondary' : 'warning' }`"
      text
      rounded
      :aria-label="`${ appSettingsStore.getIsLocked ? 'Unlock lineup' : 'Lock lineup' }`"
      :title="`${ appSettingsStore.getIsLocked ? 'Unlock lineup' : 'Lock lineup' }`"
  />
</template>
