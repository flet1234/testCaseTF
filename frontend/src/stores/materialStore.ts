import api from "@/api";
import type { MaterialListItem } from "@/views/MaterialsView.vue";
import { defineStore } from "pinia";

// stores/materialStore.ts
export const useMaterialStore = defineStore('material', {
  state: () => ({
    materials: [] as MaterialListItem[],
    isLoading: false
  }),
  actions: {
    async fetchMaterials() {
      this.isLoading = true;
      try {
        const { data } = await api.get('/materials');
        this.materials = data;
      } finally {
        this.isLoading = false;
      }
    }
  }
});