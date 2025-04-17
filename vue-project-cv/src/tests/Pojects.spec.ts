import { mount } from '@vue/test-utils';
import Projects from '@/views/Projects.vue';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import projectService from '@/service/services/projectService';
import ProjectComponent from '@/components/Project.vue';
import type { Project } from '@/types/project';
import i18n from '@/plugins/i18n';

const tMock = vi.fn((key: string) => key);

vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    locale: { value: 'en' },
    t: tMock,
  }),
  createI18n: vi.fn(() => ({
    global: {
      locale: 'en',
      t: (key: string) => key,
    },
  })),
}));

vi.mock('@/service/services/projectService', () => ({
  default: {
    getProjects: vi.fn(),
  },
}));

describe('Projects.vue', () => {
  let mockProjects: Project[];

  beforeEach(() => {
    mockProjects = [
      { id: 1, name: 'Project 1', description: { en: 'description 1', es: 'descripcion 1' }, data: { en: 'data 1', es: 'datos 1' } },
      { id: 2, name: 'Project 2', description: { en: 'description 2', es: 'descripcion 2' }, data: { en: 'data 2', es: 'datos 2' } },
    ];

    vi.clearAllMocks();
    vi.mocked(projectService.getProjects).mockResolvedValue(mockProjects);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the projects container and list', async () => {
    const wrapper = mount(Projects, {
      global: {
        plugins: [i18n],
      },
    });

    await wrapper.vm.$nextTick();

    const projectComponents = wrapper.findAllComponents(ProjectComponent);

    expect(wrapper.find('.projects-container').exists()).toBe(true);
    expect(wrapper.find('.projects-list').exists()).toBe(true);
    expect(wrapper.find('.project-component').exists()).toBe(true);
    expect(wrapper.find('.project-navigation').exists()).toBe(true);
    expect(projectComponents.length).toBe(mockProjects.length);
  });

  it('calls the translation function with correct keys', () => {
    mount(Projects);

    expect(tMock).toHaveBeenCalledWith('projects.title');
    expect(tMock).toHaveBeenCalledWith('home.navGuide');
    expect(tMock).toHaveBeenCalledWith('projects.contact');
  });

  it('fetches and renders project data correctly', async () => {
    const wrapper = mount(Projects);

    await wrapper.vm.$nextTick();

    expect(projectService.getProjects).toHaveBeenCalled();

    const projectComponents = wrapper.findAllComponents(ProjectComponent);
    expect(wrapper.find('.projects-container').exists()).toBe(true);
    expect(wrapper.find('.projects-list').exists()).toBe(true);
    expect(wrapper.find('.project-component').exists()).toBe(true);
    expect(wrapper.find('.project-navigation').exists()).toBe(true);

    expect(projectComponents[0].props('project')).toEqual(mockProjects[0]);
  });

  it('handles errors during project fetching gracefully', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    vi.mocked(projectService.getProjects).mockRejectedValue(new Error('Failed to fetch projects'));

    const wrapper = mount(Projects);

    await wrapper.vm.$nextTick();

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching projects:', expect.any(Error));
    consoleErrorSpy.mockRestore();
  });
});