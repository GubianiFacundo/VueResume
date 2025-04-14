<template>
  <section>
    <h2 class="title">{{ props.title }}</h2>
    <ul v-if="items && items.length">
      <li v-for="(item, index) in props.items" :key="index">
        <div class="item-content-name">
          <h2 v-if="(item.category !== CategoryType.JOB)">{{ item.name }}</h2>
        </div>
        <div class="item-content">
          <p v-if="(item.category !== CategoryType.JOB) && item.description">{{ item.description }}
            <span v-if="item.fromdate && item.todate">
              ({{ formatDate(item.fromdate) }} - {{ formatDate(item.todate) }})
            </span>
            <span v-else-if="item.fromdate">({{ formatDate(item.fromdate) }})</span>
          </p>
          <a v-if="item.link" :href="item.link" target="_blank">{{ item.name }}</a>
          <p v-if="(item.category === CategoryType.JOB) && item.description">{{ item.description }}
            <span v-if="item.fromdate && item.todate">
              ({{ formatDate(item.fromdate) }} - {{ formatDate(item.todate) }})
            </span>
            <span v-else-if="item.fromdate">({{ formatDate(item.fromdate) }})</span>
          </p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import type { Resource } from "@/types/resource";
import { defineProps } from "vue";
import { CategoryType } from '@/types/resource';
import { formatDate } from "@/utils/formatter";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: null,
  },
  items: {
    type: Array<Resource>,
    default: () => [],
  },
});
</script>

<style scoped>
ul {
  list-style: none;
  gap: 1rem;
}

li {
  margin-bottom: 1rem;
}

.title {
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid #ffffff;
}

.item-content-name {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

.item-content {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

a {
  color: #0077cc;
  text-decoration: none;
  font-weight: bold;
}

a:hover {
  text-decoration: underline;
  background-color: transparent;
}

p {
  margin: 0;
  padding: 0;
  white-space: nowrap;
}

.item-content p {
  white-space: normal;
}
</style>