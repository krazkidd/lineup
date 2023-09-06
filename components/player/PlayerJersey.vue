<script setup lang="ts">
import type { Player } from '~~/types';

const props = defineProps<{
    player: Player,
    jerseyColor: string,
    jerseyTextColor: string
}>();
</script>

<template>
    <svg viewBox="215 45 526.2 372.045" width="3em" height="3em" xmlns="http://www.w3.org/2000/svg">
        <use x="-308.27" href="@/assets/images/cloth-t-shirt.svg#shirt-back" :fill="`#${ props.jerseyColor }`" />
        <text x="390" y="200" font-size="10em" :fill="`#${ props.jerseyTextColor }`">{{ props.player.number }}</text>
    </svg>
</template>

<style scoped>

</style>
