import { defineStore, skipHydrate, acceptHMRUpdate } from "pinia";
import { nanoid } from "nanoid";

import type { Spot, Lineup } from '~~/types';

// NOTE: This requires `ssr: false` in `nuxt.config.*` because the server will try to
//       serialize our computed state properties to JSON, and they will fail because
//       functions can't be serialized. (With SSR turned on but with the experimental
//       `renderJsonPayloads: false` flag, it may work.)
//
//       See: [The Pinia guide](https://pinia.vuejs.org/core-concepts/)
//            https://github.com/vuejs/pinia/issues/447#issuecomment-1455285437
//            https://github.com/nuxt/nuxt/issues/20889

export const useAppSettingsStoreClientOnly = defineStore('AppSettingsStoreClientOnly', {
  state: () => {
    const _colorMode = useColorMode();

    const _lineup = useLocalStorage<Lineup>('AppSettingsStoreClientOnly:lineup', {
      id: nanoid(),

      teamName: '',
      jerseyColor: 'f47373',
      jerseyTextColor: '000000',

      isLocked: false,
      spots: [],
    }, {
      mergeDefaults: true
    });

    // NOTE: We provide setters so we can persist to storage.
    //       Source: https://github.com/vuejs/pinia/issues/447#issuecomment-1455285437

    const colorMode = computed<string>({
      get: () => {
        return _colorMode.preference;
      },
      set: (v) => {
        _colorMode.preference = v;
      },
    });

    const teamName = computed<string>({
      get: () => {
        return _lineup.value.teamName;
      },
      set: (v) => {
        _lineup.value.teamName = v;
      },
    });

    const jerseyColor = computed<string>({
      get: () => {
        return _lineup.value.jerseyColor;
      },
      set: (v) => {
        _lineup.value.jerseyColor = v;
      },
    });

    const jerseyTextColor = computed<string>({
      get: () => {
        return _lineup.value.jerseyTextColor;
      },
      set: (v) => {
        _lineup.value.jerseyTextColor = v;
      },
    });

    const isLocked = computed<boolean>({
      get: () => {
        return _lineup.value.isLocked;
      },
      set: (v) => {
        _lineup.value.isLocked = v;
      },
    });

    const spots = computed<Spot[]>({
      get: () => {
        return _lineup.value.spots;
      },
      set: (v) => {
        _lineup.value.spots = v;
      },
    });

    function $reset() {
      //TODO
    }

    return {
      colorMode: skipHydrate(colorMode),

      teamName: skipHydrate(teamName),
      jerseyColor: skipHydrate(jerseyColor),
      jerseyTextColor: skipHydrate(jerseyTextColor),

      isLocked: skipHydrate(isLocked),
      spots: skipHydrate(spots),

      $reset,
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
  import.meta.hot.accept(acceptHMRUpdate(useAppSettingsStoreClientOnly, import.meta.hot));
}