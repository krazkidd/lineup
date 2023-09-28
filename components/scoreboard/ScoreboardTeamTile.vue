<script setup lang="ts">
import type { ButtonPassThroughOptions } from 'primevue/button';
import type { CardPassThroughOptions } from 'primevue/card';

import type { Team } from "~~/types";

const props = defineProps<{
    team: Team | undefined,
    score: number
}>();

const emit = defineEmits<{
    (e: "addRun"): void;
    (e: "removeRun"): void;
}>();

const cardPassThroughOptions = computed(() => ({
  root: {
    class: 'accent m-1 w-64',
  },
  title: {
    class: 'rounded',
    style: {
        color: props.team ? `#${props.team!.jerseyTextColor}` : '',
        backgroundColor: props.team ? `#${props.team!.jerseyColor}` : '',
    }
  }
} as CardPassThroughOptions));

const buttonPassThroughOptions = {
  label: {
    class: 'hidden'
  }
} as ButtonPassThroughOptions;
</script>

<template>
    <Card :pt="cardPassThroughOptions">
        <template #header>
            <span class="text-6xl">{{ props.score }}</span>
        </template>
        <template #title>{{ props.team?.name }}</template>
        <template #content>
            <div class="flex justify-around">
                <Button
                    @click="emit('addRun')"
                    icon="pi pi-caret-up"
                    severity="success"
                    rounded
                    aria-label="Add Run"
                    title="Add Run"
                    :loading="!props.team"
                    :pt="buttonPassThroughOptions"
                />

                <Button
                    @click="emit('removeRun')"
                    icon="pi pi-caret-down"
                    severity="danger"
                    rounded
                    outlined
                    aria-label="Remove Run"
                    title="Remove Run"
                    :loading="!props.team"
                    :pt="buttonPassThroughOptions"
                />
            </div>
        </template>
    </Card>
</template>