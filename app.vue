<script setup lang="ts">
import type { SidebarPassThroughOptions } from 'primevue/sidebar';
import type { MenuPassThroughOptions } from 'primevue/menu';

import { navMenuItems, homeMenuItem } from '~~/data/nav'

const config = useRuntimeConfig();
const colorMode = useColorMode();

const isSidebarVisible = ref(false);

const sidebarPassThroughOptions: SidebarPassThroughOptions = {
  header: {
    class: 'flex justify-between w-full p-3'
  },
  content: {
    class: 'flex flex-col w-full md:w-20rem lg:w-30rem h-full'
  }
};

const menuPassThroughOptions: MenuPassThroughOptions = {
  root: {
    class: 'grow w-full'
  }
};
</script>

<template>
  <Sidebar v-model:visible="isSidebarVisible" position="right" :pt="sidebarPassThroughOptions">
    <template #header>
      <Button
        @click="colorMode.preference = colorMode.preference === 'system' ? 'dark' : colorMode.preference === 'dark' ? 'light' : 'system'"
        class="text-gray-800 border-gray-800 dark:text-gray-300 dark:border-gray-300"
        size="small"
        outlined
        aria-label="Color mode"
        title="Color mode"
      >
        <template v-if="colorMode.preference === 'system'">
          <i class="pi pi-desktop pi-fw pr-2"></i>
          System
        </template>
        <template v-if="colorMode.preference === 'dark'">
          <i class="pi pi-moon pi-fw pr-2"></i>
          Dark
        </template>
        <template v-if="colorMode.preference === 'light'">
          <i class="pi pi-sun pi-fw pr-2"></i>
          Light
        </template>
      </Button>
    </template>

    <template #default>
      <Menu :model="navMenuItems" :pt="menuPassThroughOptions">
        <template #item="{ label, item, props }">
          <RouterLink :to="item.to!" v-slot="{ href, route, navigate, isActive, isExactActive }" custom>
            <a :href="href" v-bind="props.action" @click="navigate($event).then(() => isSidebarVisible = false)" :class="{ 'router-link-active': isActive, 'router-link-exact-active': isExactActive }">
              <span v-bind="props.icon" />
              <span v-bind="props.label">{{ label }}</span>
            </a>
          </RouterLink>
        </template>
      </Menu>

      <div class="text-sm m-5">
        This program is licensed to you for use under the <a href="https://www.gnu.org/licenses/agpl.html" class="underline">GNU AGPL v3</a>. <a href="https://github.com/krazkidd/lineup"><i class="pi pi-github" /></a>
      </div>
    </template>
  </Sidebar>

  <div class="flex flex-col items-center min-h-screen">
    <div class="flex justify-between items-center w-full p-1">
      <RouterLink :to="homeMenuItem.to!" :title="homeMenuItem.label" class="inline-block p-2">
        <img :src="`${config.app.baseURL}favicon/favicon-32x32.png`" :alt="homeMenuItem.label as string" />
      </RouterLink>

      <Button
        @click="isSidebarVisible = true"
        icon="pi pi-bars"
        severity="secondary"
        text
        title="Menu"
      />
    </div>

    <div class="grow justify-center w-full md:w-3/4 xl:w-1/2 p-5">
      <NuxtPage />
    </div>
  </div>

  <Toast />
</template>
