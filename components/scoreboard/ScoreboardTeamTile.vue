<script setup lang="ts">
import type { ButtonPassThroughOptions } from 'primevue/button';
import type { CardPassThroughOptions } from 'primevue/card';

import type { Team } from "~~/types";

const props = withDefaults(defineProps<{
    team: Team | undefined,
    score: number,
    showButtons?: boolean
}>(), {
    showButtons: false
});

const emit = defineEmits<{
    (e: "incrementScore", payload: number): void;
}>();

function onClick(increment: number) {
  if (props.score + increment >= 0) {
    emit('incrementScore', increment);
  }
}

const cardPassThroughOptions = computed<CardPassThroughOptions>(() => ({
  root: {
    class: 'accent m-1 w-64',
  },
  title: {
    class: 'rounded truncate',
    style: {
        color: props.team ? `#${props.team.jerseyTextColor}` : '',
        backgroundColor: props.team ? `#${props.team.jerseyColor}` : '',
    }
  },
  body: {
    class: 'py-1',
  },
  content: {
    class: [
        'py-1',
        {
            hidden: !props.showButtons
        }
    ]
  },
}));

const buttonPassThroughOptions: ButtonPassThroughOptions = {
  label: {
    class: 'hidden'
  }
};
</script>

<template>
    <Card :pt="cardPassThroughOptions">
        <template #header>
            <span class="text-6xl">{{ props.score }}</span>
        </template>
        <template #title>{{ props.team?.name }}</template>
        <template #content>
            <div class="flex space-x-2 justify-center">
                <Button
                    @click="onClick(1)"
                    icon="pi pi-caret-up"
                    severity="success"
                    rounded
                    aria-label="Add Run"
                    title="Add Run"
                    :loading="!props.team"
                    :pt="buttonPassThroughOptions"
                />

                <Button
                    @click="onClick(-1)"
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