import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import TimeSelector from '@/components/search/TimeSelector.vue';

vi.mock('@/composables/useTimeOptions', () => {
  return {
    useTimeOptions: vi.fn().mockReturnValue({
      timeOptions: ['18:00', '18:30', '19:00'],
    }),
  };
});

describe('TimeSelect Component', () => {
  it('renders time options', () => {
    const wrapper = mount(TimeSelector);

    const options = wrapper.findAll('option');
    expect(options.length).toBe(4); // Includes the default "Time" option
    expect(options[1].text()).toBe('18:00');
    expect(options[2].text()).toBe('18:30');
    expect(options[3].text()).toBe('19:00');
  });

  it('updates model value on selection', async () => {
    const wrapper = mount(TimeSelector);

    const select = wrapper.find('select');
    await select.setValue('18:30');

    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['18:30']); //quick fix
  });
});
