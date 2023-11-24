<script setup lang="ts">
import type { ButtonPassThroughOptions } from 'primevue/button';
import { useToast } from "primevue/usetoast";

import { scoreboardMenuItem } from '~~/data/nav';
import type { ID, Team } from '~~/types';

const toast = useToast();

const props = defineProps<{
    teamId: ID
    team: Team
}>();

const buttonPassThroughOptions = {
  label: {
    class: 'hidden'
  }
} as ButtonPassThroughOptions;

const isDialogVisible = ref(false);

function getScoreboardPath(path: string) {
    return location.origin.concat(path, '/', props.teamId);
}

function clickQrCode(path: string) {
    const scoreboardPath = getScoreboardPath(path);

    if (navigator.share) {
        navigator.share({
            title: `${props.team.name}'s Scoreboard`,
            url: scoreboardPath
        }).catch(console.error);
    } else if (navigator.clipboard) {
        navigator.clipboard.writeText(scoreboardPath).then(
            () => {
                toast.add({ severity: 'info', detail: 'Scoreboard URL copied to clipboard!', life: 2000 });
            },
            () => {
                toast.add({ severity: 'error', detail: 'Scoreboard URL not copied to clipboard!', life: 2000 });
            },
        );
    }
}
</script>


<template>
    <Button
        @click="isDialogVisible = true"
        v-bind="$attrs"
        icon="pi pi-share-alt pi-fw"
        severity="secondary"
        text
        rounded
        aria-label="Share"
        title="Share"
        :pt="buttonPassThroughOptions"
    />

    <Dialog
        v-model:visible="isDialogVisible"
        modal
        :header="`${team.name}'s Scoreboard`"
        :pt="{
            root: { class: 'w-full md:w-3/4 xl:w-1/2' },
            content: { class: 'pt-1' }
        }"
    >
        <RouterLink :to="scoreboardMenuItem.to!" v-slot="{ href, route, navigate, isActive, isExactActive }" custom>
            <button type="button" @click="clickQrCode(href)" class="block mx-auto mb-3">
                <VueQrcode
                    :value="getScoreboardPath(href)"
                    type="image/png"
                    :color="{ dark: '#000000ff', light: '#ffffffff' }"
                />
            </button>
            <p class="text-center">
                Click or scan the QR code, or use <a :href="`${getScoreboardPath(href)}`" class="underline">this link</a>.
            </p>
        </RouterLink>
    </Dialog>
</template>
