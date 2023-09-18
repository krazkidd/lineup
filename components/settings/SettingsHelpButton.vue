<script setup lang="ts">
import { nanoid } from "nanoid";

import { Position } from "~~/types";
import type { Player, Spot } from "~~/types";

const fakeSpot = {
  id: nanoid(),
  player: {
    id: nanoid(),
    name: '',
    number: '',
  } as Player,
  position: Position.DH
} as Spot;

const buttonPassThroughOptions = {
  label: {
    class: 'hidden'
  }
};

const isDialogVisible = ref(false);
</script>

<template>
  <div>
    <Button @click="isDialogVisible = true" icon="pi pi-question-circle" severity="secondary" text rounded aria-label="Help" title="Help" :pt="buttonPassThroughOptions" />

    <Dialog
        v-model:visible="isDialogVisible"
        modal
        header="Help"
        :pt="{
            root: { class: 'w-full md:w-3/4 xl:w-1/2' },
            content: { class: 'pt-1' }
        }"
      >
      <div class="py-2">
        <ul class="list-disc">
          <li>
            Click the
            <LineupJerseyButton
              :spot="fakeSpot"
              :size="'1em'"
              class="inline-block rounded-full w-[1em]"
              disabled="true"
            />
            icon to change jersey number.
          </li>
          <li>
            Click the
            <LineupPositionButton
              :spot="fakeSpot"
              class="inline-block bg-white text-black rounded-full text-center text-xs p-1"
            />
            icon to change field position.
          </li>
          <li>
            Click <strong>and hold</strong> the <span class="drag-handle">⣿</span> icon to reorder players.
          </li>
          <li>
            Click the <i class="pi pi-lock-open" /> icon to prevent accidental changes.
          </li>
        </ul>
      </div>
    </Dialog>
  </div>
</template>
