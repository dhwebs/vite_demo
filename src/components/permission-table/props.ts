import type { PermissionTableProps } from './types';
import type { PropType } from 'vue';
export default {
  data: {
    type: Array as PropType<PermissionTableProps['data']>,
    default: () => []
  },
  checkable: {
    type: Boolean as PropType<PermissionTableProps['checkable']>,
    default: false
  }
};
