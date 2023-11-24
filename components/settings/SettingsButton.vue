<script setup lang="ts">
import type { ButtonPassThroughOptions } from 'primevue/button';

import { useTeamStore } from '~~/stores/Team';
import { getTeam, setJerseyColor, setJerseyTextColor } from '~~/db/Team';

const db = useFirestore();

const teamStore = useTeamStore();

const { data: team } = useDocument(await getTeam(db, teamStore.id));

const buttonPassThroughOptions: ButtonPassThroughOptions = {
  label: {
    class: 'hidden'
  }
};

const isDialogVisible = ref(false);
</script>


<template>
  <Button
    @click="isDialogVisible = true"
    icon="pi pi-cog pi-fw"
    severity="secondary"
    text
    rounded
    aria-label="Settings"
    title="Settings"
    :pt="buttonPassThroughOptions"
  />

  <Dialog
    v-model:visible="isDialogVisible"
    modal
    header="Team Settings"
    :pt="{
        root: { class: 'w-full md:w-3/4 xl:w-1/2' },
        content: { class: 'pt-1' }
    }"
  >
    <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
      <div class="text-right text-xs py-2">
        Jersey Color
      </div>
      <div>
        <ColorPicker :model-value="team?.jerseyColor" @update:model-value="setJerseyColor" format="hex" />
      </div>

      <div class="text-right text-xs py-2">
        Jersey Text Color
      </div>
      <div>
        <ColorPicker :model-value="team?.jerseyTextColor" @update:model-value="setJerseyTextColor" format="hex" />
      </div>
    </div>
  </Dialog>
</template>
