import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSidebarStore = defineStore('sidebar', () => {
  const isExpanded = ref(false);

  const toggleSidebar = () => {
    isExpanded.value = !isExpanded.value;
  };

  return {
    isExpanded,
    toggleSidebar,
  };
});