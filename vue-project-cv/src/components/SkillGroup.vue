<template>
  <div>
    <h2>{{ props.title }}</h2>
    <slot :skills="props.skills">
    </slot>
  </div>
</template>

<script setup lang="ts">
import type { Skill } from '@/types';

const props = defineProps<{
  title: string;
  skills: Array<Skill>;
}>();
</script>