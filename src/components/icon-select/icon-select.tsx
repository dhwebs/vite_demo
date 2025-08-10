// FullscreenDialog.tsx
import { defineComponent, ref, watch, computed, onWatcherCleanup } from 'vue';
import { SelectInput as TSelectInput, Icon as TIcon } from 'tdesign-vue-next';
import IconList from './icon-list';
import Dialog from '../dialog';
// import type { DialogProps } from 'tdesign-vue-next';
import _props from './props';

export default defineComponent({
  name: 'h-icon-select',
  props: _props,
  emits: ['update:modelValue', 'change'],

  setup(props, { slots, emit }) {
    // 获取全部图标的列表
    const visible = ref(false);
    const checked = ref('');
    function onConfirm() {
      emitChange(checked.value);
      visible.value = false;
    }
    function handlerDialogOpen() {
      checked.value = props.modelValue || '';
      visible.value = true;
    }
    function valueDisplayRender() {
      return props.modelValue ? (
        <span class="value-display">
          <TIcon name={props.modelValue} size="16" />
          {props.modelValue}
        </span>
      ) : (
        ''
      );
    }
    const searchValue = ref('');
    function onInputChange(value: string) {
      searchValue.value = value;
    }
    function iconCheck(stem: string) {
      emitChange(stem);
      searchValue.value = '';
    }
    function emitChange(value: string) {
      emit('update:modelValue', value);
      emit('change', value);
      props.onChange?.(value);
    }
    return () => (
      <>
        <div class="h-design-icon-select">
          <TSelectInput
            placeholder={props.placeholder}
            allowInput={true}
            onInputChange={onInputChange}
            onBlur={() => onInputChange('')}
            popupVisible={!!searchValue.value}
            {...props.inputProps}
            value={props.modelValue}
            v-slots={{
              valueDisplay: valueDisplayRender,
              panel: () =>
                searchValue.value && (
                  <div class="icon-panel">
                    <IconList
                      checked={props.modelValue}
                      search={searchValue.value}
                      onClick={iconCheck}
                    />
                  </div>
                )
            }}
          />
          <t-button variant="outline" onClick={handlerDialogOpen}>
            <TIcon name="file-icon" size="16" />
          </t-button>
        </div>
        <Dialog
          v-model:visible={visible.value}
          header="选择图标"
          class="h-design-icon-select-dialog"
          onConfirm={onConfirm}
        >
          <IconList checked={props.modelValue} onClick={(stem: string) => (checked.value = stem)} />
        </Dialog>
      </>
    );
  }
});
