<template>
  <div>
    <slot name="icon"></slot>
    <p>{{ props.name }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string;
}>();
</script>