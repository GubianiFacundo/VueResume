import { mount } from '@vue/test-utils';
import Skills from '@/views/Skills.vue';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import skillService from '@/service/services/skillService';
import { SkillType, type Skill } from '@/types';
import SkillGroup from '@/components/SkillGroup.vue';
import SkillComponent from "@/components/Skill.vue";

const tMock = vi.fn((key: string) => key);

vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: tMock,
  }),
}));

vi.mock('@/service/services/skillService', () => ({
  default: {
    getSkills: vi.fn(),
  },
}));

describe('Skills.vue', () => {
  let mockSkills: Skill[];

  beforeEach(() => {
    mockSkills = [
      { id: 1, name: 'Skill 1', type: SkillType.FRONTEND, link: 'mdi-frontend' },
      { id: 2, name: 'Skill 2', type: SkillType.BACKEND, icon: 'mdi-backend' },
    ];

    vi.clearAllMocks();
    vi.mocked(skillService.getSkills).mockResolvedValue(mockSkills);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the skills container and groups', async () => {
    const mockSkillGroups = [
      {
        title: SkillType.FRONTEND,
        skills: [
          { id: 1, name: 'Skill 1', type: SkillType.FRONTEND, link: 'mdi-frontend' },
          { id: 2, name: 'Skill 2', type: SkillType.FRONTEND, link: 'mdi-frontend' },
        ],
      },
      {
        title: SkillType.BACKEND,
        skills: [
          { id: 3, name: 'Skill 3', type: SkillType.BACKEND, icon: 'mdi-backend' },
          { id: 4, name: 'Skill 4', type: SkillType.BACKEND, icon: 'mdi-backend' },
        ],
      },
    ];

    const wrapper = mount(Skills, {
      global: {
        mocks: {
          skillGroups: mockSkillGroups,
        },
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.skills-container').exists()).toBe(true);
    expect(wrapper.find('.skills-groups-grid').exists()).toBe(true);

    const skillGroup = wrapper.findAllComponents(SkillGroup);
    const skillComponent = wrapper.findAllComponents(SkillComponent);

    expect(skillGroup.length).toBe(mockSkillGroups.length);
    expect(skillGroup[0].props('skills').length).toBe(2);
    expect(skillComponent.length).toBe(4);
  });

  it('calls the translation function with correct keys', () => {
    mount(Skills);

    expect(tMock).toHaveBeenCalledWith('skills.title');
    expect(tMock).toHaveBeenCalledWith('home.navGuide');
    expect(tMock).toHaveBeenCalledWith('projects.contact');
  });

  it('fetches and renders skill groups correctly', async () => {
    const mockSkillGroups = [
      {
        title: SkillType.FRONTEND,
        skills: [
          { id: 1, name: 'Skill 1', type: SkillType.FRONTEND, link: 'mdi-frontend' },
          { id: 2, name: 'Skill 2', type: SkillType.FRONTEND, link: 'mdi-frontend' },
        ],
      },
      {
        title: SkillType.BACKEND,
        skills: [
          { id: 3, name: 'Skill 3', type: SkillType.BACKEND, icon: 'mdi-backend' },
          { id: 4, name: 'Skill 4', type: SkillType.BACKEND, icon: 'mdi-backend' },
        ],
      },
    ];

    const wrapper = mount(Skills, {
      global: {
        mocks: {
          skillGroups: mockSkillGroups,
        },
      },
    });

    await wrapper.vm.$nextTick();

    expect(skillService.getSkills).toHaveBeenCalled();

    const skillGroup = wrapper.findAllComponents(SkillGroup);
    expect(skillGroup.length).toBe(2);
    expect(skillGroup[0].props('title')).toBe(SkillType.FRONTEND);
    expect(skillGroup[0].props('skills')).toEqual([
      { id: 1, name: 'Skill 1', type: SkillType.FRONTEND, link: 'mdi-frontend' },
      { id: 2, name: 'Skill 2', type: SkillType.FRONTEND, link: 'mdi-frontend' },
    ]);
  });

  it('handles errors during skill fetching gracefully', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    vi.mocked(skillService.getSkills).mockRejectedValue(new Error('Failed to fetch skills'));

    const wrapper = mount(Skills);
    await wrapper.vm.$nextTick();

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching skills:', expect.any(Error));

    consoleErrorSpy.mockRestore();
  });
});