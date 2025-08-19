import type { PropType } from 'vue';
export default {
  modelValue: {
    type: String,
    default: ''
  },
  onChange: {
    type: Function as PropType<(value: string) => void>,
    default: () => {}
  }
};
