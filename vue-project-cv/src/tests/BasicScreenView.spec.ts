import { mount } from '@vue/test-utils';
import BasicScreenView from '@/views/BasicScreenView.vue';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const tMock = vi.fn((key: string) => key);

vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: tMock,
  }),
}));

describe('BasicScreenView.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the header, content, and footer slots', () => {
    const wrapper = mount(BasicScreenView, {
      slots: {
        header: '<div class="test-header">Header Content</div>',
        content: '<div class="test-content">Content Section</div>',
        footer: '<div class="test-footer">Footer Content</div>',
      },
    });

    expect(wrapper.find('.test-header').exists()).toBe(true);
    expect(wrapper.find('.test-header').text()).toBe('Header Content');

    expect(wrapper.find('.test-content').exists()).toBe(true);
    expect(wrapper.find('.test-content').text()).toBe('Content Section');

    expect(wrapper.find('.test-footer').exists()).toBe(true);
    expect(wrapper.find('.test-footer').text()).toBe('Footer Content');
  });

  it('calls the translation function with correct keys', () => {
    mount(BasicScreenView);

    expect(tMock).toHaveBeenCalledWith('footer.designed');
  });

  it('renders developer information correctly', () => {
    const wrapper = mount(BasicScreenView);

    const devName = 'Facundo Gubiani';
    const devLinkedin = 'https://www.linkedin.com/in/facundo-gubiani/';
    const devGithub = 'https://github.com/GubianiFacundo';

    expect(wrapper.find('.italicName').text()).toBe(devName);

    const linkedInLink = wrapper.find(`a[href="${devLinkedin}"]`);
    expect(linkedInLink.exists()).toBe(true);
    expect(linkedInLink.attributes('target')).toBe('_blank');

    const githubLink = wrapper.find(`a[href="${devGithub}"]`);
    expect(githubLink.exists()).toBe(true);
    expect(githubLink.attributes('target')).toBe('_blank');
  });
});