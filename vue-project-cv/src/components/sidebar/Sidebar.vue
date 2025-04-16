<template>
  <aside :class="['sidebar', { expanded: isExpanded }]">
    <div class="toggle-btn">
      <ButtonControl :icon="isExpanded ? 'mdi-close' : 'mdi-menu'" :onClick="toggleSidebar" />
    </div>

    <nav class="nav-buttons">
      <ListComponent :items="routes" generic="PathList">
        <template #item="{ item }">
          <router-link :to="item.path" class="list-item">
            <v-icon class="icon material-icons">{{ getItemIcon(item) }}</v-icon>
            <span class="text">{{ t(`sidebar.${String(item.name).toLowerCase()}`) }}</span>
          </router-link>
        </template>
      </ListComponent>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import ButtonControl from '@/controls/ButtonControl.vue';
import ListComponent from '@/components/ListComponent.vue';
import { useSidebarStore } from '@/stores/sidebar';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const sidebarStore = useSidebarStore();
const isExpanded = computed(() => sidebarStore.isExpanded);
const toggleSidebar = sidebarStore.toggleSidebar;

const getItemIcon = (item: { meta?: { icon?: string } }) => {
  return item.meta?.icon || 'default_icon';
};

export interface PathList {
  path: string;
  name: string;
  meta: {
    icon: string;
  };
}

const router = useRouter();

const routes = computed(() =>
  router.getRoutes().filter(route => route.name && route.meta?.icon)
);

</script>

<style scoped>
.sidebar {
  display: grid;
  position: fixed;
  color: white;
  top: 0;
  left: 0;
  height: 100%;
  background-color: #2c3e50;
  grid-template-rows: auto 1fr;
  width: auto;
  transition: width 0.3s ease-in-out;
  z-index: 1000;
  overflow: hidden;
  gap: 0px 0px;
  grid-template-areas:
    "toggle-btn"
    "nav-buttons";
}

.sidebar.expanded {
  width: auto;
}

.toggle-btn {
  grid-area: toggle-btn;
  display: flex;
  padding: 1rem;
  border-bottom: 1px solid #34495e;
  position: sticky;
  top: 0;
  z-index: 1100;
  background-color: #2c3e50;
}

.nav-buttons {
  grid-area: nav-buttons;
  display: flex;
  flex-direction: row;
}

.list-item {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: white;
  transition: background-color 0.3s ease-in-out;
  width: 100%;
}

.list-item:hover {
  background-color: #34495e;
}

.icon {
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
}

.text {
  white-space: nowrap;
  opacity: 0;
  width: 0;
  overflow: hidden;
  transition: opacity 0.3s ease-in-out, width 0.3s ease-in-out;
  display: flex;
  align-items: center;
}

.sidebar.expanded .text {
  opacity: 1;
  width: auto;
}

@media (max-width: 768px) {
  .sidebar {
    width: auto;
  }

  .sidebar.expanded {
    width: auto;
  }

  .icon {
    font-size: 1.5rem;
  }
}
</style>