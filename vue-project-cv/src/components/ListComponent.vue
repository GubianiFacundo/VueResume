<template>
  <ul class="list-control">
    <li v-for="(item, index) in items" :key="index">
      <slot name="item" :item="item" />
    </li>
  </ul>
</template>

<script setup lang="ts" generic="T">

defineProps<{
  items: T[];
}>();

defineSlots<{
  default?: (props: { item: T }) => any;
  item?: (props: { item: T }) => any;
}>();
</script>

<style scoped>
.list-control {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>