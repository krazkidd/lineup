<script setup lang="ts">
const mode = useColorMode();
</script>

<template>
  <nav class="flex items-end p-2 space-x-2">
    <Button @click="mode.preference = mode.preference === 'system' ? 'dark' : mode.preference === 'dark' ? 'light' : 'system'" title="Color mode">
      <i v-if="mode.preference === 'system'" class="pi pi-desktop"></i>
      <i v-if="mode.preference === 'dark'" class="pi pi-moon"></i>
      <i v-if="mode.preference === 'light'" class="pi pi-sun"></i>
    </Button>
  </nav>

  <div class="flex justify-center h-screen">
    <Lineup />
  </div>
</template>

<style>
.dark body {
  background-color: #091a28;
  /* color: #ebf4f1; */
}
</style>
