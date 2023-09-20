import { defineStore, acceptHMRUpdate } from "pinia";

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

    // NOTE: We provide setters so we can persist to storage.
    //       Source: https://github.com/vuejs/pinia/issues/447#issuecomment-1455285437

    const colorMode = computed<string>({
      get: () => _colorMode.preference,
      set: (v) => _colorMode.preference = v
    });

    // function $reset() {
    //   //TODO
    // }

    return {
      colorMode,

      //$reset,
    };
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppSettingsStore, import.meta.hot));
}