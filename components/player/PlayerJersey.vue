<script setup lang="ts">
import { useAppSettingsStore } from '~~/stores/AppSettings'

import type { Player } from '~~/types';

const appSettingsStore = useAppSettingsStore();

const props = defineProps<{
    player: Player,
}>();
</script>

<template>
    <svg viewBox="215 45 526.2 372.045" width="3em" height="3em" xmlns="http://www.w3.org/2000/svg">
        <use x="-308.27" href="@/assets/images/cloth-t-shirt.svg#shirt-back" :fill="`#${ appSettingsStore.getJerseyColor }`" />
        <text x="390" y="200" font-size="10em" :fill="`#${ appSettingsStore.getJerseyTextColor }`">{{ props.player.number }}</text>
    </svg>
</template>

<style scoped>

</style>
