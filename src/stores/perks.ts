import { defineStore } from 'pinia';

import { Perk } from '@/types/Perk';

export const usePerksStore = defineStore('perks', {
  state: (): { perks: Perk[] } => ({
    perks: [],
  }),
  getters: {
    getPerkById: (state) => {
      return (perkId: number) => state.perks.find((perk) => perk.id === perkId);
    },
  },
  actions: {
    addPerk(data: Perk) {
      // Here we should do the HTTP request to save the Perk
      this.perks = [...this.perks, data];
    },
    updatePerk(perkId: number, data: Perk) {
      // Here we should do the HTTP request to update the Perk
      const perkIndex = this.perks.findIndex((perk) => perk.id === perkId);

      if (perkIndex !== -1) {
        this.perks[perkIndex] = {
          ...this.perks[perkIndex],
          ...data,
        };
      }
    },
    removePerk(perkId: number) {
      // Here we should do the HTTP request to remove the Perk
      this.perks = this.perks.filter((perk) => perk.id !== perkId);
    },
  },
});
