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

const cardPassThroughOptions = computed(() => ({
  root: {
    class: 'm-1',
  },
  title: {
    class: 'font-normal',
  },
  body: {
    class: 'py-1',
  },
  content: {
    class: [
        '!py-1',
        {
            hidden: !props.showButtons
        }
    ]
  },
} as CardPassThroughOptions));

const buttonPassThroughOptions = {
  label: {
    class: 'hidden'
  },
} as ButtonPassThroughOptions;
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