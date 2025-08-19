import { defineComponent, ref } from 'vue';
import { Form as TForm, FormItem as TFormItem, Button as TButton } from 'tdesign-vue-next';

export default defineComponent({
  name: 'HSearchForm',
  setup(props, { slots }) {
    const expanded = ref(false);
    const handleToggle = () => {
      expanded.value = !expanded.value;
    };

    const handleSubmit = () => {
      // 处理表单提交
      console.log('筛选条件:');
    };

    const handleReset = () => {};

    return () => (
      <TForm layout="inline">
        {/* 默认插槽 */}
        {slots.default?.()}

        {/* 具名插槽 foldForm */}
        {expanded.value && slots.foldForm?.()}
        <TFormItem>
          <TButton type="button" variant="text" theme="primary" onClick={handleToggle}>
            {expanded.value ? '折叠' : '展开'}
          </TButton>
          <TButton type="submit" theme="primary">
            查询
          </TButton>
          <TButton theme="default" onClick={handleReset}>
            重置
          </TButton>
        </TFormItem>
      </TForm>
    );
  }
});
