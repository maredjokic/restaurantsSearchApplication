import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import DateSelector from '@/components/search/DateSelector.vue';

vi.mock('@/composables/useDateOptions', () => {
  return {
    useDateOptions: vi.fn().mockReturnValue({
      dateOptions: ['2023-03-02', '2023-03-03', '2023-03-04'],
    }),
  };
});

describe('DateSelect Component', () => {
  it('renders date options', () => {
    const wrapper = mount(DateSelector);

    const options = wrapper.findAll('option');
    expect(options.length).toBe(4); // Includes the default "Date" option
    expect(options[1].text()).toBe('2023-03-02');
    expect(options[2].text()).toBe('2023-03-03');
    expect(options[3].text()).toBe('2023-03-04');
  });

  it('updates model value on selection', async () => {
    const wrapper = mount(DateSelector);

    const select = wrapper.find('select');
    await select.setValue('2023-03-03');

    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['2023-03-03']); //quick fix
  });
});
