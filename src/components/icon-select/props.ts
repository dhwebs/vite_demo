import type { PropType } from 'vue';
export default {
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  inputProps: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({})
  },
  onChange: {
    type: Function as PropType<(value: string) => void>,
    default: () => {}
  }
};
