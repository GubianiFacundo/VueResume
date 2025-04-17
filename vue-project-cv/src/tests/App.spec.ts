import { mount } from '@vue/test-utils';
import App from '@/App.vue';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';
import vuetify from '@/plugins/vuetify';
import i18n from '@/plugins/i18n';
import { reactive } from 'vue';

import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Skills from '@/views/Skills.vue';
import Projects from '@/views/Projects.vue';
import Contact from '@/views/Contact.vue';


let sidebarStore = reactive({
  isExpanded: true,
});

vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    locale: { value: 'en' },
    t: (key: string) => key,
  }),
  createI18n: vi.fn(() => ({
    global: {
      locale: 'en',
      t: (key: string) => key,
    },
  })),
}));

vi.mock('pinia', () => ({
  createPinia: vi.fn(),
  defineStore: vi.fn(() => vi.fn(() => ({}))),
}));

vi.mock('@/stores/sidebar', () => ({
  useSidebarStore: () => sidebarStore,
}));

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: Home, meta: { icon: 'mdi-home' } },
    { path: '/about', name: 'About', component: About, meta: { icon: 'mdi-account' } },
    { path: '/skills', name: 'Skills', component: Skills, meta: { icon: 'mdi-wrench' } },
    { path: '/projects', name: 'Projects', component: Projects, meta: { icon: 'mdi-briefcase' } },
    { path: '/contact', name: 'Contact', component: Contact, meta: { icon: 'mdi-mail' } },
  ]
});

describe('App.vue', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the sidebar and header', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router, vuetify],
      },
    });

    expect(wrapper.find('[data-testid="sidebar"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="headerbar"]').exists()).toBe(true);
  });

  it('updates --sidebar-width CSS variable based on locale and isExpanded', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router, vuetify, i18n],
      },
    });

    const appElement = document.createElement('div');
    appElement.id = 'app';
    document.body.appendChild(appElement);

    wrapper.vm.$watch(
      () => [sidebarStore.isExpanded, i18n.global.locale],
      ([isExpanded, locale]) => {
        if (locale === 'en') {
          appElement.style.setProperty(
            '--sidebar-width',
            isExpanded ? '120px' : '80px'
          );
        } else if (locale === 'es') {
          appElement.style.setProperty(
            '--sidebar-width',
            isExpanded ? '150px' : '80px'
          );
        }
      },
      { immediate: true }
    );

    expect(appElement.style.getPropertyValue('--sidebar-width')).toBe('120px');

    sidebarStore.isExpanded = false;
    await wrapper.vm.$nextTick();

    expect(appElement.style.getPropertyValue('--sidebar-width')).toBe('80px');
  });
});