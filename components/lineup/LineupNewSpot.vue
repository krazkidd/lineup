<script setup lang="ts">
import { nanoid } from "nanoid";

import { Position, type Spot } from "~~/types";

const emit = defineEmits<{
  (e: "add", payload: Spot): void;
}>();

const focused = ref(false);

const playerName = ref("");
const playerNumber = ref("");

function createSpot(e: Event) {
  if (playerName.value.trim()) {
    e.preventDefault();

    emit("add", {
      id: nanoid(),
      player: {
        id: nanoid(),
        name: playerName.value.trim(),
        number: playerNumber.value.trim(),
      },
      position: Position.DH
    } as Spot);
  }

  playerName.value = '';
  playerNumber.value = '';
}
</script>

<template>
  <div>
    <textarea
      v-model="playerName"
      @keydown.tab="createSpot"
      @keyup.enter="createSpot"
      class="focus:bg-white focus:shadow resize-none rounded w-full border-none bg-transparent p-2 cursor-pointer"
      :class="{
        'h-7': !focused,
        'h-20': focused,
      }"
      style="outline: none !important"
      @focus="focused = true"
      @blur="focused = false"
      :placeholder="!focused ? '+ Add A Player' : 'Enter player name'"
    />
  </div>
</template>
