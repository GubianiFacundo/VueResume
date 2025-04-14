<template>
  <BasicScreenView>
    <template #content>
      <div class="projects-container">
        <h2 class="projects-title">{{ t("projects.title") }}</h2>
        <div class="projects-list">
          <projectComponent v-for="project in projects" :key="project.id" :project="project">
            <template #default="{ project }">
              <div class="project-item">
                <h3 class="project-name">{{ project.name }}</h3>
                <p class="project-description">{{ project.description }}</p>
                <p class="project-data">{{ project.data }}</p>
              </div>
            </template>
          </projectComponent>
        </div>
        <NavigationGuide :text="t('home.navGuide')" :buttonText="t('projects.contact')" routeName="Contact" />
      </div>
    </template>
  </BasicScreenView>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import projectService from '@/service/services/projectService';
import type { Project } from '@/types/project';
import { useI18n } from 'vue-i18n';
import projectComponent from '@/components/Project.vue';
import BasicScreenView from '@/views/BasicScreenView.vue';
import NavigationGuide from '@/components/NavigationGuide.vue';

const { t, locale } = useI18n();

const projects = ref<Array<Project>>([]);

const fetchProjects = async () => {
  try {
    projects.value = await projectService.getProjects();
  } catch (error) {
    console.error('Error fetching projects:', error);
  }
};

fetchProjects();

</script>

<style lang="scss">
.projects-container {
  padding: 0.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(64, 64, 64, 0.3);
}

.projects-title {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1.5rem;
}

.projects-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.project-item {
  padding: 1.5rem;
  background-color: #a8a176;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.project-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.project-name {
  border-bottom: 1px solid #34495e;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.project-description {
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: var(--v-text-secondary);
}

.project-data {
  font-size: 0.9rem;
  color: var(--v-text-secondary);
}
</style>