<template>
  <div>
    <hr class="separator" />
    <div class="inline-content">
      <h3>{{ text }}</h3>
      <v-btn
        rounded="lg"
        size="x-large"
        color="primary"
        @click="navigate"
      >
        {{ buttonText }}
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  buttonText: {
    type: String,
    required: true,
  },
  routeName: {
    type: String,
    required: true,
  },
});

const router = useRouter();

const navigate = () => {
  router.push({ name: props.routeName });
};
</script>

<style scoped>
.separator {
  padding: 0.5rem;
  border: none;
  border-top: 1px solid #ffffff;
  margin-top: 3rem;
}

.inline-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.inline-content h3 {
  margin: 0;
}
</style>