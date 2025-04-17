import { mount } from '@vue/test-utils';
import Home from '@/views/Home.vue';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import NavigationGuide from '@/components/NavigationGuide.vue';

const tMock = vi.fn((key: string) => key);

vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: tMock,
  }),
}));

describe('Home.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the banner and navigation guide', () => {
    const wrapper = mount(Home);

    expect(wrapper.find('.banner-container').exists()).toBe(true);

    const bannerImage = wrapper.find('.banner-image');
    expect(bannerImage.exists()).toBe(true);
    expect(bannerImage.attributes('alt')).toBe('Banner');

    const navigationGuide = wrapper.findComponent(NavigationGuide);
    expect(navigationGuide.exists()).toBe(true);
  });

  it('calls the translation function with correct keys', () => {
    mount(Home);

    expect(tMock).toHaveBeenCalledWith('home.description');
    expect(tMock).toHaveBeenCalledWith('home.navGuide');
    expect(tMock).toHaveBeenCalledWith('home.about');
  });

  it('renders the banner image with the correct src', () => {
    const wrapper = mount(Home);

    const bannerImage = wrapper.find('.banner-image');
    expect(bannerImage.attributes('src')).toBe('/src/public/BannerCv2.png');
  });
});