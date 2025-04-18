import { mount } from '@vue/test-utils';
import Sidebar from '@/components/sidebar/Sidebar.vue';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Skills from '@/views/Skills.vue';
import Projects from '@/views/Projects.vue';
import Contact from '@/views/Contact.vue';

const tMock = vi.fn((key: string) => key)
vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: tMock,
  }),
}));

const toggleSidebarMock = vi.fn();
vi.mock('@/stores/sidebar', () => ({
  useSidebarStore: () => ({
    isExpanded: false,
    toggleSidebar: toggleSidebarMock,
  }),
}));

const mockRoutes = [
  { path: '/', name: 'Home', component: Home, meta: { icon: 'mdi-home' } },
  { path: '/about', name: 'About', component: About, meta: { icon: 'mdi-account' } },
  { path: '/skills', name: 'Skills', component: Skills, meta: { icon: 'mdi-wrench' } },
  { path: '/projects', name: 'Projects', component: Projects, meta: { icon: 'mdi-briefcase' } },
  { path: '/contact', name: 'Contact', component: Contact, meta: { icon: 'mdi-mail' } },
];

const router = createRouter({
  history: createWebHistory(),
  routes: mockRoutes
});


describe('Sidebar.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the sidebar with correct classes', () => {
    const wrapper = mount(Sidebar, {
      global: {
        plugins: [router],
      },
    });

    const sidebar = wrapper.find('.sidebar');
    expect(sidebar.exists()).toBe(true);

    expect(sidebar.classes()).not.toContain('expanded');
  });

  it('toggles the sidebar when the toggle button is clicked', async () => {
    const wrapper = mount(Sidebar, {
      global: {
        plugins: [router],
      },
    });

    const toggleButton = wrapper.find('.toggle-btn button');
    await toggleButton.trigger('click');


    expect(toggleSidebarMock).toHaveBeenCalled();
  });

  it('renders the routes correctly', () => {
    const wrapper = mount(Sidebar, {
      global: {
        plugins: [router],
      },
    });

    const listItems = wrapper.findAll('.list-item');
    expect(listItems.length).toBe(mockRoutes.length);

    const firstRoute = listItems[0];
    expect(firstRoute.find('v-icon').text()).toBe('mdi-home');
    expect(firstRoute.find('.text').text()).toBe('sidebar.home');
  });

  it('calls the translation function with correct keys', () => {
    mount(Sidebar, {
      global: {
        plugins: [router],
      },
    });

    expect(tMock).toHaveBeenCalledWith('sidebar.home');
    expect(tMock).toHaveBeenCalledWith('sidebar.about');
  });
});