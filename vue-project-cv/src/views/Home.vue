<template>
  <BasicScreenView>
    <template #header>
      <div class="banner-container">
        <div class="banner">
          <img :src="banner" alt="Banner" class="banner-image" />
        </div>
      </div>
    </template>

    <template #content>
      <h3>{{ t("home.description") }}</h3>
      <NavigationGuide
        :text="t('home.navGuide')"
        :buttonText="t('home.about')"
        routeName="About"
      />
    </template>

    <template #footer>
    </template>
  </BasicScreenView>
</template>

<script setup lang="ts">
import BasicScreenView from '@/views/BasicScreenView.vue';
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import BannerCV from '@/public/BannerCv2.png';
import router from '@/router/router';
import NavigationGuide from '@/components/NavigationGuide.vue';

const { t, locale } = useI18n();

const banner = ref(BannerCV);


const goToAbout = () => {
  router.push({ name: 'About' });
};

</script>

<style scoped>
.banner-container {
  position: relative;
  text-align: center;
  margin-bottom: 2rem;
}

.banner {
  width: 100%;
  height: auto;
  box-shadow: 0 4px 8px rgba(71, 64, 64, 0.2);
  border-radius: 8px;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

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

.inline-content p {
  margin: 0;
}

@media (max-width: 768px) {
  .banner {
    max-height: 250px;
  }

  .profile-picture {
    width: 120px;
    height: 120px;
  }
}

@media (max-width: 480px) {
  .banner {
    max-height: 200px;
  }

  .profile-picture {
    width: 100px;
    height: 100px;
  }
}
</style>