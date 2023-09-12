<script setup lang="ts">
import { nanoid } from "nanoid";

import { Position } from "~~/types";
import type { Player, Spot } from "~~/types";

const emit = defineEmits<{
  (e: "add", payload: Spot): void;
}>();

const focused = ref(false);

const playerName = ref("");
const playerNumber = ref("");

function createSpot(e: Event) {
  if (playerName.value) {
    e.preventDefault();

    emit("add", {
      id: nanoid(),
      player: {
        id: nanoid(),
        name: playerName.value,
        number: '00',
      } as Player,
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
      v-model.trim="playerName"
      @keydown.tab="createSpot"
      @keyup.enter="createSpot"
      class="bg-transparent focus:shadow rounded text-gray-700 placeholder-gray-700 dark:text-gray-300 dark:placeholder-gray-300 leading-tight resize-none cursor-pointer w-full px-1 py-2"
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
