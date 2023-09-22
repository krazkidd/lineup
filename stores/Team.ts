import { defineStore, acceptHMRUpdate } from "pinia";
import { nanoid } from "nanoid";

import type { ID } from '~~/types';

// NOTE: This Pinia store requires `ssr: false` in `nuxt.config.*` because the server
//       will try to serialize our computed state properties to JSON, and that will fail
//       because functions can't be serialized.
//
//       See: [The Pinia guide](https://pinia.vuejs.org/core-concepts/)
//            https://github.com/vuejs/pinia/issues/829 (look for "Advanced SSR")
//            https://github.com/vuejs/pinia/issues/447#issuecomment-1455285437
//            https://github.com/nuxt/nuxt/issues/20889

export const useTeamStore = defineStore('TeamStore', {
  state: () => {
    const _id = useLocalStorage<ID>('TeamStore:id', nanoid());
    const _isLocked = useLocalStorage<boolean>('TeamStore:isLocked', false);

    // NOTE: We provide setters so we can persist to storage.
    //       Source: https://github.com/vuejs/pinia/issues/447#issuecomment-1455285437

    const id = computed<ID>({
      get: () => _id.value,
      set: (v) => _id.value = v
    });

    const isLocked = computed<boolean>({
      get: () => _isLocked.value,
      set: (v) => _isLocked.value = v
    });

    // function $reset() {
    //   //TODO
    // }

    return {
      id,

      isLocked,

      //$reset,
    };
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTeamStore, import.meta.hot));
}