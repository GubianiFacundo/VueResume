<template>
  <BasicScreenView>
    <template #header>

    </template>

    <template #content>
      <div class="about-container">
        <section class="about-me-section">
          <h1 class="section-title">{{ t('about.title') }}</h1>
          <h2 class="about-me-text">{{ t('about.description') }}</h2>
          <h3 class="about-me-text">{{ t('about.subtitle') }}</h3>
        </section>

        <InfoSection class="background-section" :title="t('about.background')" :items="background" />

        <InfoSection class="experience-section" :title="t('about.experience')" :items="jobs" />

        <InfoSection class="degrees-section" :title="t('about.degrees')" :items="degrees" />

        <NavigationGuide :text="t('home.navGuide')" :buttonText="t('about.skills')" routeName="Skills"
          class="navigation" />
      </div>
    </template>
    <template #footer>
    </template>
  </BasicScreenView>
</template>

<script setup lang="ts">
import BasicScreenView from '@/views/BasicScreenView.vue';
import { useI18n } from 'vue-i18n';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import InfoSection from '@/components/InfoSection.vue';
import NavigationGuide from '@/components/NavigationGuide.vue';
import { type Resource } from '@/types/resource';
import resourceService from '@/service/services/resourceService';
import { CategoryType } from '@/types/resource';

const { t } = useI18n();
const route = useRoute();

const resources = ref<Resource[]>([]);

const jobs = ref<Resource[]>([]);
const degrees = ref<Resource[]>([]);
const background = ref<Resource[]>([]);

onMounted(async () => {
  resources.value = await resourceService.getResources();

  jobs.value = resources.value.filter((resource) => resource.category === CategoryType.JOB);
  background.value = resources.value.filter((resource) => resource.category === CategoryType.EDUCATION);
  degrees.value = resources.value.filter((resource) => resource.category === CategoryType.COURSE);
});

</script>

<style scoped>
.about-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-template-rows: auto auto auto;
  gap: 2rem;
  padding: 0.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(64, 64, 64, 0.3);
  grid-template-areas:
    "about-me about-me about-me"
    "background-section experience degrees"
    "navigation navigation navigation";
}

.section-title {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
}

.about-me-section {
  grid-area: about-me;
  text-align: justify;
}

.about-me-text {
  padding: 0.5rem;
  line-height: 1.6;
}

.background-section {
  grid-area: background-section;
}

.experience-section {
  grid-area: experience;
}

.degrees-section {
  grid-area: degrees;
}

.navigation {
  grid-area: navigation;
  text-align: center;
}

.background-section,
.experience-section,
.degrees-section {
  background-color: #a8a176;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.experience-list,
.degrees-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.experience-list li,
.degrees-list li {
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.about-title {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1.5rem;
}

.about h1 {
  font-size: 2em;
  margin-bottom: 10px;
}

.about h2 {
  margin-top: 20px;
  font-size: 1.5em;
}

.about p,
.about ul {
  margin: 10px 0;
}

@media (max-width: 768px) {
  .about-container {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto auto auto;
    grid-template-areas:
      "about-me"
      "background-section"
      "experience"
      "degrees"
      "navigation";
  }
}
</style>