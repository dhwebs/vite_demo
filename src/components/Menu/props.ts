import type { MenuItem } from './types';
import type { PropType } from 'vue';
export default {
  data: {
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
  },
  menuPosition: {
    type: String as PropType<'aside' | 'header'>,
    default: 'aside'
  }
};
