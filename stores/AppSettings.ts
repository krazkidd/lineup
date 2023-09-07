import { defineStore, acceptHMRUpdate } from "pinia";

import type { Spot } from '~~/types';

// HACK: Unfortunately, we were not able to expose any state properties
//       because we could not enforce writes to be replicated to the
//       persistent local storage. Specifically, we were not able to
//       do so under Nuxt's server-side rendering scheme. (With SSR turned
//       off or with the experimental `renderJsonPayloads: false` flag,
//       it may work.)
//
//       For performance reasons, we store all the values we want separately
//       instead of as a larger JSON object.
//
//       See: [The Pinia guide](https://pinia.vuejs.org/core-concepts/)
//            https://github.com/vuejs/pinia/issues/447#issuecomment-1455285437
//            https://github.com/nuxt/nuxt/issues/20889

export const useAppSettingsStore = defineStore('AppSettingsStore', {
  // state: () => {
  //   function $reset() {
  //     //TODO
  //   }

  //   return {
  //     $reset,
  //   };
  // },
  actions: {
    setColorMode(v: string) {
      const mode = useColorMode();

      mode.preference = v;
    },

    setTeamName(v: string) {
      const store = useLocalStorage('AppSettingsStore:teamName', '');

      store.value = v;
    },
    setJerseyColor(v: string) {
      const store = useLocalStorage('AppSettingsStore:jerseyColor', '');

      store.value = v;
    },
    setJerseyTextColor(v: string) {
      const store = useLocalStorage('AppSettingsStore:jerseyTextColor', '');

      store.value = v;
    },

    setIsLocked(v: boolean) {
      const store = useLocalStorage('AppSettingsStore:isLocked', false);

      store.value = v;
    },
    addSpot(spot: Spot) {
      const store = useLocalStorage('AppSettingsStore:spots', [] as Array<Spot>);

      if (!this.getIsLocked) {
        store.value.push({ ...spot });
      }
    },
    removeSpot(playerId: string) {
      const store = useLocalStorage('AppSettingsStore:spots', [] as Array<Spot>);

      store.value = store.value.filter(s => s.player.id !== playerId);
    },
  },
  getters: {
    getColorMode: state => useColorMode().preference,

    getTeamName: state => useLocalStorage('AppSettingsStore:teamName', '').value,
    getJerseyColor: state => useLocalStorage('AppSettingsStore:jerseyColor', 'f47373').value,
    getJerseyTextColor: state => useLocalStorage('AppSettingsStore:jerseyTextColor', '000000').value,

    getIsLocked: state => useLocalStorage('AppSettingsStore:isLocked', false).value,
    getSpots: state => useLocalStorage('AppSettingsStore:spots', [] as Array<Spot>).value,
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppSettingsStore, import.meta.hot));
}