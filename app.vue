<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col items-center min-h-screen">
    <!-- <nav class="flex items-end p-2 space-x-2">
    </nav> -->

    <NuxtPage class="grow justify-center w-full md:w-3/4 xl:w-1/2 p-5" />

    <div class="text-center text-sm pt-10">
      This program is licensed to you for use under the <a href="https://www.gnu.org/licenses/agpl.html" class="underline">GNU AGPL v3</a>. <a href="https://github.com/krazkidd/lineup"><i class="pi pi-github" /></a>
    </div>
  </div>
</template>

<style>
body,
#__nuxt {
  min-height: 100vh;
}

body {
  @apply text-gray-800 dark:text-gray-300 dark:bg-[#091a28];
}

input {
  @apply placeholder-gray-600 dark:placeholder-gray-400;
}
</style>
