import type { ContentRouteTab } from './types';
import type { PropType } from 'vue';
export default {
  data: {
    type: Array as PropType<ContentRouteTab[]>,
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
