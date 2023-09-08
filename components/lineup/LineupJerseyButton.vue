<script setup lang="ts">
import { useAppSettingsStore } from '~~/stores/AppSettings'

import type { Spot } from '~~/types';

const appSettingsStore = useAppSettingsStore();

const props = defineProps<{
    spot: Spot,
}>();

const isDialogVisible = ref(false);
</script>

<template>
    <div @click="isDialogVisible = true">
        <svg viewBox="215 45 526.2 372.045" width="3em" height="3em" xmlns="http://www.w3.org/2000/svg">
            <use x="-308.27" href="@/assets/images/cloth-t-shirt.svg#shirt-back" :fill="`#${ appSettingsStore.jerseyColor }`" />
            <text x="390" y="200" font-size="10em" :fill="`#${ appSettingsStore.jerseyTextColor }`">{{ props.spot.player.number }}</text>
        </svg>

        <Dialog
            v-model:visible="isDialogVisible"
            modal
            :header="`${props.spot.player.name}'s Number`"
            :pt="{
                root: { class: 'w-full md:w-3/4 xl:w-1/2' },
                content: { class: 'pt-1' }
            }"
        >
            <div class="flex flex-column gap-2">
                <InputText
                    type="text"
                    v-model="props.spot.player.number"
                    @keyup.enter="isDialogVisible = false"
                    :pt="{
                        root: { class: '!w-full' },
                        item: { class: 'leading-8' }
                    }"
                    aria-describedby="player-number-help"
                />
                <small id="player-number-help">Enter 1 or 2 characters.</small>
            </div>
        </Dialog>
    </div>
</template>