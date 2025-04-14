<template>
  <BasicScreenView>
    <template #content>
      <div class="skills-container">
        <h1 class="skills-title">{{ t("skills.title") }}</h1>
        <div class="skills-groups-grid">
          <div class="skills-group-box" v-for="(group, index) in skillGroups" :key="index">
            <SkillGroup :title="group.title" :skills="group.skills">
              <template #default="{ skills }">
                <div class="skills-grid">
                  <div class="skill-box" v-for="skill in skills" :key="skill.name">
                    <SkillComponent :name="skill.name">
                      <template #icon>
                        <img v-if="skill.link" :src="skill.link" alt="Skill Image" class="skill-image" />
                        <v-icon v-else :class="skill.icon" class="skill-icon" />
                      </template>
                    </SkillComponent>
                  </div>
                </div>
              </template>
            </SkillGroup>
          </div>
        </div>
        <NavigationGuide :text="t('home.navGuide')" :buttonText="t('projects.contact')" routeName="Projects" />
      </div>
    </template>
  </BasicScreenView>

</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import SkillGroup from "@/components/SkillGroup.vue";
import SkillComponent from "@/components/Skill.vue";
import { useI18n } from "vue-i18n";
import skillService from "@/service/services/skillService";
import type { Skill } from "@/types/skill";
import { SkillType } from "@/types/skill";
import BasicScreenView from '@/views/BasicScreenView.vue';
import NavigationGuide from '@/components/NavigationGuide.vue';

const { t, locale } = useI18n();

const skillGroups = ref<{ title: string; skills: Skill[] }[]>([]);

onMounted(async () => {
  const skills = await skillService.getSkills();
  const groupedSkills = Object.values(SkillType).map((type) => ({
    title: type,
    skills: skills.filter((skill) => skill.type === type),
  }));
  skillGroups.value = groupedSkills;
});

</script>

<style scoped>
.skills-container {
  padding: 0.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(64, 64, 64, 0.3);
}

.skills-title {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1.5rem;
}

.skills-groups-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.skills-group-box {
  padding: 1.5rem;
  background-color: #a8a176;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.skills-group-box:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.skills-grid {
  display: grid;
  padding: 0.5rem;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1rem;
}

.skill-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: #867e49;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
}

.skill-box:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.skill-image {
  width: 25px;
  height: 25px;
  margin-top: 5px;
  filter: grayscale(100%);
}

.skill-icon {
  font-size: 25px;
  color: rgb(66, 61, 61);
  filter: grayscale(100%);
}
</style>