<template>
  <BasicScreenView>
    <template #header>
    </template>

    <template #content>
      <div class="contact-container boxGeneral">
        <section class="contact-header">
          <h1 class="section-title">{{ t('contact.title') }}</h1>
          <p class="contact-description">{{ t('contact.description') }}</p>
        </section>

        <div class="contact-methods">
          <div class="contact-box boxSection">
            <h2 class="social-icon"><v-icon>mdi-email</v-icon>{{ t('contact.email') }}</h2>
            <p>
              <a :href="'mailto:' + devEmail">{{ devEmail }}</a>
            </p>
          </div>
          <div class="contact-box boxSection">
            <h2 class="social-icon"><v-icon>mdi-linkedin</v-icon>{{ t('contact.linkedin') }} </h2>
            
            <p>
              <a :href="devLinkedin" target="_blank">{{ devName }}</a>
            </p>
          </div>
          <div class="contact-box boxSection">
            <h2 class="social-icon"><v-icon>mdi-github</v-icon>{{ t('contact.github') }}</h2>
            <p>
              <a :href="devGithub" target="_blank">{{ devName }}</a>
            </p>
          </div>
        </div>
      </div>
    </template>

    <template #footer>
    </template>
  </BasicScreenView>
</template>

<script setup lang="ts">
import BasicScreenView from '@/views/BasicScreenView.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const devName = 'Facundo Gubiani';
const devEmail = 'gubiani.facundo@gmail.com';
const devLinkedin = 'https://www.linkedin.com/in/facundo-gubiani/';
const devGithub = 'https://github.com/GubianiFacundo';

</script>

<style scoped>
.contact-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding: 1rem;
}

.contact-header {
  text-align: center;
}

.section-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.contact-description {
  font-size: 1.2rem;
}

.contact-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.contact-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.contact-box h2 {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.contact-box p {
  font-size: 1rem;
  margin: 0;
}

.social-icon {
  font-size: 24px;
}
</style>