import { mount } from '@vue/test-utils';
import About from '@/views/About.vue';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import resourceService from '@/service/services/resourceService';
import { CategoryType, type Resource } from '@/types/resource';

const tMock = vi.fn((key: string) => key);

vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: tMock,
  }),
}));

vi.mock('@/service/services/resourceService', () => ({
  default: {
    getResources: vi.fn(),
  },
}));

describe('About.vue', () => {
  let mockResources;

  beforeEach(() => {
    mockResources = [
      { id: 1, category: CategoryType.JOB, name: 'Job 1' },
      { id: 2, category: CategoryType.EDUCATION, name: 'Education 1' },
      { id: 3, category: CategoryType.COURSE, name: 'Course 1' },
    ];

    vi.clearAllMocks();
    vi.mocked(resourceService.getResources).mockResolvedValue(mockResources);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders all sections correctly', async () => {
    const wrapper = mount(About);

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.about-me-section').exists()).toBe(true);
    expect(wrapper.find('.background-section').exists()).toBe(true);
    expect(wrapper.find('.experience-section').exists()).toBe(true);
    expect(wrapper.find('.degrees-section').exists()).toBe(true);
    expect(wrapper.find('.navigation').exists()).toBe(true);
  });

  it('calls the translation function with correct keys', async () => {
    const wrapper = mount(About);

    await wrapper.vm.$nextTick();

    expect(tMock).toHaveBeenCalledWith('about.title');
    expect(tMock).toHaveBeenCalledWith('about.description');
    expect(tMock).toHaveBeenCalledWith('about.subtitle');
    expect(tMock).toHaveBeenCalledWith('about.background');
    expect(tMock).toHaveBeenCalledWith('about.experience');
    expect(tMock).toHaveBeenCalledWith('about.degrees');
    expect(tMock).toHaveBeenCalledWith('home.navGuide');
    expect(tMock).toHaveBeenCalledWith('about.skills');
  });

  it('fetches and filters resources correctly', async () => {
    const wrapper = mount(About) as unknown as {
      vm: {
        jobs: Resource[];
        background: Resource[];
        degrees: Resource[];
        $nextTick: () => Promise<void>;
      };
    };

    await wrapper.vm.$nextTick();

    const { jobs, background, degrees } = wrapper.vm;

    expect(resourceService.getResources).toHaveBeenCalled();

    expect(jobs).toEqual([
      { id: 1, category: CategoryType.JOB, name: 'Job 1' },
    ]);
    expect(background).toEqual([
      { id: 2, category: CategoryType.EDUCATION, name: 'Education 1' },
    ]);
    expect(degrees).toEqual([
      { id: 3, category: CategoryType.COURSE, name: 'Course 1' },
    ]);
  });
});