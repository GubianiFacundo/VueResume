<template>
  <BasicScreenView>
    <template #header></template>

    <template #content>
      <div class="about-container boxGeneral">
        <section class="about-me-section">
          <div class="section-title">
            <v-btn class="resume-download-btn" rounded="lg" size="x-large" color="primary" @click="downloadResume">
              <v-icon icon="mdi-download" />
              {{ t('about.download') }}
            </v-btn>
            <span class="about-title">{{ t('about.title') }}</span>
          </div>
          <h2 class="about-me-text">{{ t('about.description') }}</h2>
          <h3 class="about-me-text">{{ t('about.subtitle') }}</h3>
        </section>

        <InfoSection class="background-section boxSection" :title="t('about.background')" :items="background" />
        <InfoSection class="experience-section boxSection" :title="t('about.experience')" :items="jobs" />
        <InfoSection class="degrees-section boxSection" :title="t('about.degrees')" :items="degrees" />

        <NavigationGuide :text="t('home.navGuide')" :buttonText="t('about.skills')" routeName="Skills"
          class="navigation" />
      </div>
    </template>
    <template #footer></template>
  </BasicScreenView>
</template>

<script setup lang="ts">
import BasicScreenView from '@/views/BasicScreenView.vue';
import { useI18n } from 'vue-i18n';
import { ref, onMounted } from 'vue';
import InfoSection from '@/components/InfoSection.vue';
import NavigationGuide from '@/components/NavigationGuide.vue';
import { type Resource } from '@/types/resource';
import resourceService from '@/service/services/resourceService';
import { CategoryType } from '@/types/resource';
import resumePdf from '@/public/resume.pdf';

const { t } = useI18n();

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

const downloadResume = () => {
  const link = document.createElement('a');
  link.href = resumePdf;
  link.download = 'Facundo Gubiani FullStack Developer.pdf';
  link.click();
};
</script>

<style scoped>
.about-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-template-rows: auto auto auto;
  gap: 2rem;
  padding: 0.5rem;
  grid-template-areas:
    "about-me about-me about-me"
    "background-section experience degrees"
    "navigation navigation navigation";
}

.section-title {
  position: relative;
  text-align: center;
}

.resume-download-btn {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}

.about-title {
  display: inline-block;
  font-size: 1.8rem;
  font-weight: bold;
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

@media (max-width: 768px) {
  .section-title {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .resume-download-btn {
    position: static;
    transform: none;
    margin-bottom: 0.5rem;
  }

  .about-title {
    text-align: center;
  }
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