import { defineStore, skipHydrate, acceptHMRUpdate } from "pinia";
import { nanoid } from "nanoid";

import type { Spot, Lineup } from '~~/types';

// NOTE: This Pinia store requires `ssr: false` in `nuxt.config.*` because the server
//       will try to serialize our computed state properties to JSON, and that will fail
//       because functions can't be serialized.
//
//       See: [The Pinia guide](https://pinia.vuejs.org/core-concepts/)
//            https://github.com/vuejs/pinia/issues/829 (look for "Advanced SSR")
//            https://github.com/vuejs/pinia/issues/447#issuecomment-1455285437
//            https://github.com/nuxt/nuxt/issues/20889

export const useAppSettingsStore = defineStore('AppSettingsStore', {
  state: () => {
    const _colorMode = useColorMode();

    const defaults = {
      id: nanoid(),

      teamName: '',
      jerseyColor: 'f47373',
      jerseyTextColor: '000000',

      isLocked: false,
      spots: [],
    };

    const _lineup = useLocalStorage<Lineup>('AppSettingsStore:lineup', defaults, { mergeDefaults: true });

    // NOTE: We provide setters so we can persist to storage.
    //       Source: https://github.com/vuejs/pinia/issues/447#issuecomment-1455285437

    const colorMode = computed<string>({
      get: () => _colorMode.preference,
      set: (v) => _colorMode.preference = v
    });

    const teamName = computed<string>({
      get: () => _lineup.value.teamName,
      set: (v) => _lineup.value.teamName = v
    });

    const jerseyColor = computed<string>({
      get: () => _lineup.value.jerseyColor,
      set: (v) => _lineup.value.jerseyColor = v
    });

    const jerseyTextColor = computed<string>({
      get: () => _lineup.value.jerseyTextColor,
      set: (v) => _lineup.value.jerseyTextColor = v
    });

    const isLocked = computed<boolean>({
      get: () => _lineup.value.isLocked,
      set: (v) => _lineup.value.isLocked = v
    });

    const spots = computed<Spot[]>({
      get: () => _lineup.value.spots,
      set: (v) => _lineup.value.spots = v
    });

    // function $reset() {
    //   //TODO
    // }

    return {
      //TODO we may need to skipHydrate() if we ever reenable SSR

      colorMode,

      teamName,
      jerseyColor,
      jerseyTextColor,

      isLocked,
      spots,

      //$reset,
    };
  },
  actions: {
    addSpot(spot: Spot) {
      if (!this.isLocked) {
        this.spots.push({ ...spot });
      }
    },
    removeSpot(playerId: string) {
      this.spots = this.spots.filter(s => s.player.id !== playerId)
    },
  },
  // getters: {

  // }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppSettingsStore, import.meta.hot));
}