import type { routeTab } from './types';
import type { PropType } from 'vue';
export default {
  tabData: {
    type: Array as PropType<routeTab[]>,
    default: () => []
  },
  theme: {
    type: String as PropType<'light' | 'dark'>,
    default: 'light'
  },
  exclude: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  fullscreen: {
    type: Boolean,
    default: false
  }
};
