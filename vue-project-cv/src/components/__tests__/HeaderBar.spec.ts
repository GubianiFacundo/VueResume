import { mount } from '@vue/test-utils';
import HeaderBar from '@/components/HeaderBar.vue';
import { describe, it, expect, vi, beforeEach } from 'vitest';

const localeMock = { value: "en" };
vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    locale: localeMock,
  }),
}));

const themeMock = {
  global: {
    name: { value: 'light' },
    current: { value: { dark: false } },
  },
};
vi.mock('vuetify', () => ({
  useTheme: () => themeMock,
}));

describe('HeaderBar.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the header bar with buttons and icons', () => {
    const wrapper = mount(HeaderBar);
  
    expect(wrapper.find('.header-bar').exists()).toBe(true);
  
    const themeButton = wrapper.find('v-btn[icon]');
    expect(themeButton.exists()).toBe(true);
  
    const localeButton = wrapper.find('v-btn[icon]:nth-child(2)');
    expect(localeButton.exists()).toBe(true);
  
    const localeText = wrapper.find('.locale-text');
    expect(localeText.exists()).toBe(true);
  });

  it('toggles the theme when the theme button is clicked', async () => {
    const wrapper = mount(HeaderBar);

    expect(themeMock.global.name.value).toBe('light');

    const themeButton = wrapper.find('v-btn[icon]');
    await themeButton.trigger('click');

    expect(themeMock.global.name.value).toBe('dark');
  });

  it('toggles the locale when the locale button is clicked', async () => {
    const wrapper = mount(HeaderBar);

    expect(localeMock.value).toBe('en');

    const localeButton = wrapper.find('v-btn[icon]:nth-child(2)');
    await localeButton.trigger('click');

    expect(localeMock.value).toBe('es');
  });
});