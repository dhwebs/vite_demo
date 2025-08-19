import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import SearchForm from '../search-form';

describe('HSearchForm', () => {
  it('renders default slot content', () => {
    const wrapper = mount(SearchForm, {
      slots: {
        default: '<div class="default-slot">Default Slot</div>'
      }
    });
    expect(wrapper.find('.default-slot').exists()).toBe(true);
  });

  it('toggles expanded state and renders foldForm slot', async () => {
    const wrapper = mount(SearchForm, {
      slots: {
        foldForm: '<div class="fold-slot">Fold Slot</div>'
      }
    });
    // Initially not expanded
    expect(wrapper.find('.fold-slot').exists()).toBe(false);

    // Click expand button
    await wrapper.find('button').trigger('click');
    expect(wrapper.find('.fold-slot').exists()).toBe(true);

    // Click again to collapse
    await wrapper.find('button').trigger('click');
    expect(wrapper.find('.fold-slot').exists()).toBe(false);
  });

  it('calls handleSubmit when submit button is clicked', async () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const wrapper = mount(SearchForm);

    // Click submit button (second button)
    const buttons = wrapper.findAll('button');
    await buttons[1].trigger('click');

    expect(logSpy).toHaveBeenCalledWith('筛选条件:');

    logSpy.mockRestore();
  });
});
