<template>
  <header class="header-bar">
    <div class="header-content">
      <div class="header-icons">
        <v-btn icon @click="toggleTheme">
          <v-icon>{{ isDarkTheme ? 'mdi-weather-night' : 'mdi-white-balance-sunny' }}</v-icon>
        </v-btn>

        <v-btn icon @click="toggleLocale">
          <v-icon>mdi-translate</v-icon>
          <span class="locale-text">{{ locale }}</span>
        </v-btn>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTheme } from 'vuetify'
import { useI18n } from 'vue-i18n';

const theme = useTheme();
const isDarkTheme = ref(false);
const { locale } = useI18n();

const toggleTheme = () => {
  isDarkTheme.value = !isDarkTheme.value;
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

const toggleLocale = () => {
  locale.value = locale.value === 'en' ? 'es' : 'en';
};
</script>

<style scoped>
.header-bar {
  padding:0.5rem;
  float: right;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.header-icons {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.locale-text {
  font-size: 0.75rem;
  margin-left: 0.15rem;
}
</style>