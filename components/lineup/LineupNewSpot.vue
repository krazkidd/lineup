<script setup lang="ts">
import { nanoid } from "nanoid";

import { Position } from "~~/types";
import type { Player, Spot } from "~~/types";

const props = defineProps<{
    numPlayers: number
}>();

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
  <div class="flex">
    <input
      type="text"
      v-model.trim="playerName"
      @keydown.tab="createSpot"
      @keyup.enter="createSpot"
      class="grow inline-block bg-transparent focus:shadow rounded cursor-pointer px-1 py-2"
      @focus="focused = true"
      @blur="focused = false"
      :placeholder="!focused ? '+ Add A Player' : 'Enter player name'"
    />

    <div class="shrink-0 px-1 py-2">
      {{ props.numPlayers }} players
    </div>
  </div>
</template>
