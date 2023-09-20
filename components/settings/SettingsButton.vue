<script setup lang="ts">
import { useTeamStore } from '~~/stores/Team';

const teamStore = useTeamStore();

const buttonPassThroughOptions = {
  label: {
    class: 'hidden'
  }
};

const isDialogVisible = ref(false);
</script>


<template>
  <Button
    @click="isDialogVisible = true"
    icon="pi pi-fw pi-cog"
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
        <ColorPicker v-model="teamStore.jerseyColor" format="hex" />
      </div>

      <div class="text-right text-xs py-2">
        Jersey Text Color
      </div>
      <div>
        <ColorPicker v-model="teamStore.jerseyTextColor" format="hex" />
      </div>
    </div>
  </Dialog>
</template>
