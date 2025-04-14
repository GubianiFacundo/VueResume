<script setup lang="ts">
import { RouterView } from 'vue-router';
import Sidebar from '@/components/sidebar/Sidebar.vue';
import HeaderBar from '@/components/HeaderBar.vue';
import { useI18n } from 'vue-i18n';

import { computed, watch } from 'vue';
import { useSidebarStore } from '@/stores/sidebar';
const { locale } = useI18n();

const sidebarStore = useSidebarStore();

const appClasses = computed(() => ({
  'sidebar-expanded': sidebarStore.isExpanded,
}));

watch(
  [() => sidebarStore.isExpanded, () => locale.value],
  ([isExpanded, currentLocale]) => {
    const appElement = document.getElementById('app');
    if (appElement && currentLocale === 'en') {
      appElement.style.setProperty(
        '--sidebar-width',
        isExpanded ? '120px' : '80px'
      );
    } else if (appElement && currentLocale === 'es') {
      appElement.style.setProperty(
        '--sidebar-width',
        isExpanded ? '150px' : '80px'
      );
    }
  },
  { immediate: true }
);
</script>

<template>
  <Sidebar id="main-sidebar" />
  <v-app :class="appClasses" id="main-app">
    <v-main>
      <HeaderBar />
      <v-container>
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
</style>
