<template>
  <button :class="['button-control', customClass]" @click="onClick">
    <v-icon v-if="icon" :icon="icon">{{ icon }}</v-icon>
    <v-icon v-if="text" class="text">{{ text }}</v-icon>
  </button>
</template>

<script setup lang="ts">
import { defineProps, type PropType } from 'vue';

defineProps({
  text: { type: String, default: '' },
  icon: { type: String, default: '' },
  customClass: { type: String, default: '' },
  onClick: { 
    type: Function as PropType<(event: MouseEvent) => void>,
    required: true 
  },
});

</script>

<style scoped>
.button-control {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0.5rem;
  background-color: #1abc9c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.button-control:hover {
  background-color: #16a085;
}

</style>