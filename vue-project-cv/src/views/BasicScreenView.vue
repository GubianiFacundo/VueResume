<template>
  <div class="basic-screen-view">
    <header class="header-row">
      <slot name="header"></slot>
    </header>
    <main class="content-row">
      <slot name="content"></slot>
    </main>
    <footer class="footer-row">
      <slot name="footer"></slot>
    </footer>
    
    <div class="footer">
      <p>&copy; {{ t("footer.designed") }} <span class="italicName"> {{ devName }}</span></p>
      <a :href="devLinkedIn" target="_blank">
        <v-icon class="social-icon">mdi-linkedin</v-icon>
      </a>
      <a :href="devGithub" target="_blank">
        <v-icon class="social-icon">mdi-github</v-icon>
      </a>
    </div>
  </div>

</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const devName = "Facundo Gubiani";
const devLinkedIn = "https://www.linkedin.com/in/facundo-gubiani/";
const devGithub = "https://github.com/GubianiFacundo";
</script>

<style scoped>
.basic-screen-view {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  height: 90vh;
  width: 100%;
  grid-template-areas:
    "header-row"
    "content-row"
    "footer-row";
}

.header-row {
  text-align: center;
}

.content-row {
  padding-inline-end: 1rem;
  padding-inline-start: 1rem;
}

.footer-row {
  padding: 1rem;
  text-align: center;
}

.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  border-top: 1px solid #e9ecef;
  margin-top: 1rem;
}

.footer a {
  background-color: transparent;
  text-decoration: none;
  display: flex;
  align-items: center;
}

.italicName {
  font-style: italic;
  font-size: large;
  color: #0077b5;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.social-icon {
  font-size: 24px;
  color: #0077b5;
  transition: color 0.3s ease, transform 0.2s ease;
  cursor: pointer;
}

.social-icon:hover {
  color: #005582; /* Darker LinkedIn color on hover */
  transform: scale(1.1);
}

</style>
