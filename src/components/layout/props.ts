import type { PropType } from 'vue';
export default {
  theme: {
    type: String as PropType<'aside-menu' | 'header-menu' | 'no-header'>,
    default: 'aside-menu'
  },
  footerPosition: {
    type: String as PropType<'layout-end' | 'content-end'>,
    default: 'layout-end'
  },
  menuProps: {
    type: Object as PropType<Record<string, any>>
  },
  contentProps: {
    type: Object as PropType<Record<string, any>>
  },
  userOptions: {
    type: Array as PropType<Array<Record<string, any>>>,
    default: () => []
  }
};
