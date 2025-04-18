import { mount } from '@vue/test-utils';
import InfoSection from '@/components/InfoSection.vue';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { formatDate } from '@/utils/formatter';
import { CategoryType, type Resource } from '@/types/resource';

vi.mock('@/utils/formatter', () => ({
  formatDate: vi.fn((date) => `Formatted(${date})`),
}));

describe('InfoSection.vue', () => {
  const mockItems = [
    {
      id: 1,
      name: 'Item 1',
      description: 'Description 1',
      fromdate: '2023-01-01',
      todate: '2023-12-31',
      link: 'https://example.com',
      category: CategoryType.EDUCATION,
    },
    {
      id: 2,
      name: 'Item 2',
      description: 'Description 2',
      fromdate: '2022-01-01',
      category: CategoryType.JOB,
    },
  ] as unknown as Resource[];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the title correctly', () => {
    const wrapper = mount(InfoSection, {
      props: {
        title: 'Test Title',
        items: mockItems,
      },
    });

    const title = wrapper.find('.title');
    expect(title.exists()).toBe(true);
    expect(title.text()).toBe('Test Title');
  });

  it('renders the items list correctly', () => {
    const wrapper = mount(InfoSection, {
      props: {
        title: 'Test Title',
        items: mockItems,
      },
    });

    const list = wrapper.find('ul');
    expect(list.exists()).toBe(true);

    const listItems = wrapper.findAll('li');
    expect(listItems.length).toBe(mockItems.length);

    const firstItem = listItems[0];
    expect(firstItem.find('h2').text()).toBe('Item 1');
    expect(firstItem.find('p').text()).toContain('Description 1');
    expect(firstItem.find('p').text()).toContain('Formatted(2023-01-01) - Formatted(2023-12-31)');
    expect(firstItem.find('a').attributes('href')).toBe('https://example.com');
  });

  it('handles conditional rendering for job category', () => {
    const wrapper = mount(InfoSection, {
      props: {
        title: 'Test Title',
        items: mockItems,
      },
    });

    const secondItem = wrapper.findAll('li')[1];
    expect(secondItem.find('h2').exists()).toBe(false);
    expect(secondItem.find('p').text()).toContain('Description 2');
    expect(secondItem.find('p').text()).toContain('Formatted(2022-01-01)');
  });

  it('calls formatDate for dates', () => {
    const wrapper = mount(InfoSection, {
      props: {
        title: 'Test Title',
        items: mockItems,
      },
    });

    expect(formatDate).toHaveBeenCalledWith('2023-01-01');
    expect(formatDate).toHaveBeenCalledWith('2023-12-31');
    expect(formatDate).toHaveBeenCalledWith('2022-01-01');
  });

  it('renders no list when no items are provided', () => {
    const wrapper = mount(InfoSection, {
      props: {
        title: 'Test Title',
        items: [],
      },
    });

    const list = wrapper.find('ul');
    expect(list.exists()).toBe(false);
  });
});