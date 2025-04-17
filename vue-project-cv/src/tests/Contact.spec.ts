import { mount } from '@vue/test-utils';
import Contact from '@/views/Contact.vue';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useI18n } from 'vue-i18n';

const tMock = vi.fn((key: string) => key);

vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: tMock,
  }),
}));

describe('Contact.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the contact header and methods sections', () => {
    const wrapper = mount(Contact);

    expect(wrapper.find('.contact-header').exists()).toBe(true);

    expect(wrapper.find('.contact-methods').exists()).toBe(true);

    const contactBoxes = wrapper.findAll('.contact-box');
    expect(contactBoxes.length).toBe(3);
  });

  it('calls the translation function with correct keys', () => {
    mount(Contact);

    expect(tMock).toHaveBeenCalledWith('contact.title');
    expect(tMock).toHaveBeenCalledWith('contact.description');
    expect(tMock).toHaveBeenCalledWith('contact.email');
    expect(tMock).toHaveBeenCalledWith('contact.linkedin');
    expect(tMock).toHaveBeenCalledWith('contact.github');
  });

  it('renders developer information correctly', () => {
    const wrapper = mount(Contact);

    const devName = 'Facundo Gubiani';
    const devEmail = 'gubiani.facundo@gmail.com';
    const devLinkedin = 'https://www.linkedin.com/in/facundo-gubiani/';
    const devGithub = 'https://github.com/GubianiFacundo';

    const emailLink = wrapper.find(`a[href="mailto:${devEmail}"]`);
    expect(emailLink.exists()).toBe(true);
    expect(emailLink.text()).toBe(devEmail);

    const linkedinLink = wrapper.find(`a[href="${devLinkedin}"]`);
    expect(linkedinLink.exists()).toBe(true);
    expect(linkedinLink.text()).toBe(devName);

    const githubLink = wrapper.find(`a[href="${devGithub}"]`);
    expect(githubLink.exists()).toBe(true);
    expect(githubLink.text()).toBe(devName);
  });
});