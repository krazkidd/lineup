<script setup lang="ts">
import type { ButtonPassThroughOptions } from 'primevue/button';

import { useTeamStore } from '~~/stores/Team'

const teamStore = useTeamStore();

const buttonPassThroughOptions: ButtonPassThroughOptions = {
  label: {
    class: 'hidden'
  }
};
</script>

<template>
  <Button
    @click="teamStore.isLocked = !teamStore.isLocked"
    :icon="`pi ${ teamStore.isLocked ? 'pi-lock' : 'pi-lock-open' } pi-fw`"
    :severity="`${ teamStore.isLocked ? 'secondary' : 'warning' }`"
    text
    rounded
    :aria-label="`${ teamStore.isLocked ? 'Unlock lineup' : 'Lock lineup' }`"
    :title="`${ teamStore.isLocked ? 'Unlock lineup' : 'Lock lineup' }`"
    :pt="buttonPassThroughOptions"
  />
</template>
