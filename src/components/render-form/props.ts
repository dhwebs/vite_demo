import type { TreeNode } from './types';
import type { PropType } from 'vue';
export default {
  data: {
    type: Array as PropType<TreeNode[]>,
    default: () => []
  }
};
