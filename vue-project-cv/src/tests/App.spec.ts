import { mount } from '@vue/test-utils';
import App from '@/App.vue';
import { describe, it, expect, vi } from 'vitest';

import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Skills from '@/views/Skills.vue';
import Projects from '@/views/Projects.vue';
import Contact from '@/views/Contact.vue';

import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import { createRouter, createWebHistory } from 'vue-router';
import vuetify from '@/plugins/vuetify';

// const i18n = createI18n({
//   locale: 'en',
//   messages: {
//     en: { message: 'Hello' },
//     es: { message: 'Hola' },
//   },
// });

// const pinia = createPinia();

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

vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    locale: { value: 'en' },
    t: (key: string) => key,
  }),
}));

vi.mock('pinia', () => ({
  createPinia: vi.fn(),
  defineStore: vi.fn(() => vi.fn(() => ({}))),
}));

describe('App.vue', () => {
  it('renders the sidebar and header', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router, vuetify],
      },
    });

    expect(wrapper.find('[data-testid="sidebar"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="headerbar"]').exists()).toBe(true);
  });
});