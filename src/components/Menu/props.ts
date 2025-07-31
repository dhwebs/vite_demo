import type { MenuItem } from './types';
import type { PropType } from 'vue';
export default {
  menuData: {
    type: Array as PropType<MenuItem[]>,
    default: () => []
  },
  collapsed: {
    type: Boolean,
    default: false
  },
  theme: {
    type: String as PropType<'light' | 'dark'>,
    default: 'light'
  }
};
