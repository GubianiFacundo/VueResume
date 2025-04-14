import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Skills from '@/views/Skills.vue';
import Projects from '@/views/Projects.vue';
import Contact from '@/views/Contact.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Home', component: Home, meta: { icon: 'mdi-home' } },
  { path: '/about', name: 'About', component: About, meta: { icon: 'mdi-account' } },
  { path: '/skills', name: 'Skills', component: Skills, meta: { icon: 'mdi-wrench' } },
  { path: '/projects', name: 'Projects', component: Projects, meta: { icon: 'mdi-briefcase' } },
  { path: '/contact', name: 'Contact', component: Contact, meta: { icon: 'mdi-mail' } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;