<script setup lang="ts">
const homeRoute = ref({
  label: 'Home',
  icon: 'pi pi-fw pi-home',
  route: '/'
});

const menuItems = ref([
  homeRoute.value,
  {
    label: 'Lineup',
    icon: 'pi pi-fw pi-user-edit',
    route: '/lineup'
  },
]);

const isSidebarVisible = ref(false);
const sidebarPassThroughOptions = {
  content: {
    class: 'flex flex-col justify-between w-full md:w-20rem lg:w-30rem'
  }
};
const menuPassThroughOptions = {
  root: {
    class: 'w-full'
  }
};
</script>

<template>
  <Sidebar v-model:visible="isSidebarVisible" position="right" :pt="sidebarPassThroughOptions">
    <template #default>
      <Menu :model="menuItems" :pt="menuPassThroughOptions">
        <template #item="{ label, item, props }">
          <RouterLink :to="item.route" v-slot="{ href, route, navigate, isActive, isExactActive }" custom>
            <a :href="href" v-bind="props.action" @click="navigate" :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']">
              <span v-bind="props.icon" />
              <span v-bind="props.label">{{ label }}</span>
            </a>
          </RouterLink>
        </template>
      </Menu>

      <div class="justify-self-end text-sm">
        This program is licensed to you for use under the <a href="https://www.gnu.org/licenses/agpl.html" class="underline">GNU AGPL v3</a>. <a href="https://github.com/krazkidd/lineup"><i class="pi pi-github" /></a>
      </div>
    </template>
  </Sidebar>

  <div class="flex flex-col items-center min-h-screen">
    <div class="flex justify-between items-center w-full p-1">
      <RouterLink :to="homeRoute.route" :title="homeRoute.label" class="inline-block p-2">
        <img src="@/favicon/favicon-32x32.png" :alt="homeRoute.label" />
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

.router-link-exact-active {
  @apply text-orange-600 dark:text-yellow-300;
}
</style>
