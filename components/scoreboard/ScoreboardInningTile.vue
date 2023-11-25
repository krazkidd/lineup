<script setup lang="ts">
import type { ButtonPassThroughOptions } from 'primevue/button';
import type { CardPassThroughOptions } from 'primevue/card';

const props = withDefaults(defineProps<{
    inning: number,
    showButtons?: boolean
}>(), {
    showButtons: false
});

const emit = defineEmits<{
    (e: "incrementInning", payload: number): void;
}>();

function onClick(increment: number) {
  if (props.inning + increment >= 1) {
    emit('incrementInning', increment);
  }
}

const cardPassThroughOptions = computed<CardPassThroughOptions>(() => ({
  root: {
    class: 'rounded m-1',
  },
  title: {
    class: 'text-2xl',
  },
  body: {
    class: 'p-1',
  },
  content: {
    class: [
        'p-3',
        {
            hidden: !props.showButtons
        }
    ]
  },
}));

const buttonPassThroughOptions: ButtonPassThroughOptions = {
  label: {
    class: 'hidden'
  },
};
</script>

<template>
    <Card :pt="cardPassThroughOptions">
        <template #header>
            <span class="text-3xl">{{ props.inning }}</span>
        </template>
        <template #title>Inning</template>
        <template #content>
            <div class="flex space-x-2 justify-center">
                <Button
                    @click="onClick(1)"
                    icon="pi pi-caret-up"
                    severity="success"
                    rounded
                    outlined
                    aria-label="Increment Inning"
                    title="Increment Inning"
                    :loading="!props.inning"
                    :pt="buttonPassThroughOptions"
                />

                <Button
                    @click="onClick(-1)"
                    icon="pi pi-caret-down"
                    severity="danger"
                    rounded
                    outlined
                    aria-label="Decrement Inning"
                    title="Decrement Inning"
                    :loading="!props.inning"
                    :pt="buttonPassThroughOptions"
                />
            </div>
        </template>
    </Card>
</template>