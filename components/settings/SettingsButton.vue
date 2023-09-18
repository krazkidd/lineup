<script setup lang="ts">
import { useAppSettingsStore } from '~~/stores/AppSettings';

const appSettingsStore = useAppSettingsStore();

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
    icon="pi pi-cog"
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
      header="App Settings"
      :pt="{
          root: { class: 'w-full md:w-3/4 xl:w-1/2' },
          content: { class: 'pt-1' }
      }"
    >
    <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
      <div class="text-right text-xs py-2">
        Color Mode
      </div>
      <div class="md:col-span-3">
        <Button
            @click="appSettingsStore.colorMode = appSettingsStore.colorMode === 'system' ? 'dark' : appSettingsStore.colorMode === 'dark' ? 'light' : 'system'"
            size="small"
            severity="primary"
            rounded
            aria-label="Color mode"
            title="Color mode"
          >
          <template v-if="appSettingsStore.colorMode === 'system'">
            <i class="pi pi-desktop pr-2"></i>
            System
          </template>
          <template v-if="appSettingsStore.colorMode === 'dark'">
            <i class="pi pi-moon pr-2"></i>
            Dark
          </template>
          <template v-if="appSettingsStore.colorMode === 'light'">
            <i class="pi pi-sun pr-2"></i>
            Light
          </template>
        </Button>
      </div>

      <div class="text-right text-xs py-2">
        Jersey Color
      </div>
      <div>
        <ColorPicker v-model="appSettingsStore.jerseyColor" format="hex" />
      </div>

      <div class="text-right text-xs py-2">
        Jersey Text Color
      </div>
      <div>
        <ColorPicker v-model="appSettingsStore.jerseyTextColor" format="hex" />
      </div>
    </div>
  </Dialog>
</template>
