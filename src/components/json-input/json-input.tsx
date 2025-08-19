import { defineComponent, ref } from 'vue';
import Codemirror from 'codemirror-editor-vue3';

// 导入必要的 CodeMirror 插件和样式
import 'codemirror/addon/display/placeholder.js';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/base16-light.css';
import _props from './props';

export default defineComponent({
  name: 'HJsonInput',
  components: {
    Codemirror
  },
  props: _props,
  emits: ['update:modelValue', 'change'],
  setup(props, { attrs, emit }) {
    const cmOptions = ref({
      mode: 'text/javascript',
      theme: 'base16-light',
      lineNumbers: true,
      lineWrapping: true,
      tabSize: 2,
      indentWithTabs: false,
      smartIndent: true,
      autoCloseBrackets: true,
      matchBrackets: true,
      extraKeys: {
        Tab: (cm: any) => {
          if (cm.somethingSelected()) {
            cm.indentSelection('add');
          } else {
            cm.replaceSelection(Array(cm.getOption('indentUnit') + 1).join(' '), 'end', '+input');
          }
        }
      }
    });

    function handleChange(value: string) {
      emit('update:modelValue', value);
      emit('change', value);
      props.onChange?.(value);
    }
    function handleCopy() {
      navigator.clipboard.writeText(props.modelValue);
    }
    return () => (
      <div class="h-json-input">
        {props.modelValue && (
          <t-button onClick={handleCopy} size="small" class="h-json-input-copy">
            复制
          </t-button>
        )}
        <Codemirror
          modelValue={props.modelValue}
          onChange={handleChange}
          {...{
            options: cmOptions.value,
            ...attrs
          }}
        />
      </div>
    );
  }
});
