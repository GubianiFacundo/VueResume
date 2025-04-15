<template>
  <div>
    <slot :project="localizedProject"></slot>
  </div>
</template>

<script setup lang="ts">
import type { Project } from "@/types/project";
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const props = defineProps<{
  project: Project;
}>();

const localizedProject = computed(() => {
  const project = props.project;
  return {
    id: project.id,
    name: project.name,
    description: project.description[locale.value],
    data: project.data[locale.value],
  };
}
);

</script>

<style>
</style>