import { defineStore, acceptHMRUpdate } from "pinia";
import { nanoid } from "nanoid";

import type { ID } from '~~/types';

export const useTeamStore = defineStore('TeamStore', {
  state: () => {
    return {
      id: useLocalStorage<ID>('TeamStore:id', nanoid()),
      isLocked: useLocalStorage<boolean>('TeamStore:isLocked', false),
    };
  },
  hydrate(state, initialState) {
    state.id = useLocalStorage<ID>('TeamStore:id', initialState.id).value,
    state.isLocked = useLocalStorage<boolean>('TeamStore:isLocked', initialState.isLocked).value
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTeamStore, import.meta.hot));
}