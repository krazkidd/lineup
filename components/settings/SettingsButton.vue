<script setup lang="ts">
import type { AppSettings } from '~~/types';

const props = defineProps<{
    appSettings: AppSettings
}>();

const mode = useColorMode();

const isSettingsDialogVisible = ref(false);
</script>


<template>
  <div>
    <Button @click="isSettingsDialogVisible = true" icon="pi pi-cog" severity="secondary" text rounded aria-label="Settings" title="Settings" />

    <Dialog
        v-model:visible="isSettingsDialogVisible"
        modal
        header="App Settings"
        :pt="{
            root: { class: 'h-full md:h-4/5 w-full md:w-3/4 xl:w-1/2' },
            content: { class: 'pt-1' }
        }"
      >
      <div class="grid grid-cols-2 gap-2">
        <div class="text-left">
          Color Mode
        </div>
        <div>
          <Button
              @click="mode.preference = mode.preference === 'system' ? 'dark' : mode.preference === 'dark' ? 'light' : 'system'"
              size="small"
              severity="primary"
              rounded
              aria-label="Color mode"
              title="Color mode"
            >
            <template v-if="mode.preference === 'system'">
              <i class="pi pi-desktop pr-2"></i>
              System
            </template>
            <template v-if="mode.preference === 'dark'">
              <i class="pi pi-moon pr-2"></i>
              Dark
            </template>
            <template v-if="mode.preference === 'light'">
              <i class="pi pi-sun pr-2"></i>
              Light
            </template>
          </Button>
        </div>

        <div class="text-left">
          Jersey Color
        </div>
        <div>
          <ColorPicker v-model="props.appSettings.jerseyColor" format="hex" />
        </div>

        <div class="text-left">
          Jersey Text Color
        </div>
        <div>
          <ColorPicker v-model="props.appSettings.jerseyTextColor" format="hex" />
        </div>
      </div>
    </Dialog>
  </div>
</template>
