import type { PropType } from 'vue';
export default {
  header: {
    type: String,
    default: ''
  },
  mode: {
    type: String as PropType<'modal' | 'modeless' | 'normal' | 'full-screen'>,
    default: 'modal'
  },
  visible: {
    type: Boolean,
    default: false
  },
  onBeforeClose: {
    type: Function as PropType<() => void>
  }
};
