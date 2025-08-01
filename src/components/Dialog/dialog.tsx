// FullscreenDialog.tsx
import { defineComponent, ref, watch, computed } from 'vue';
import { Dialog as TDialog } from 'tdesign-vue-next';
// import type { DialogProps } from 'tdesign-vue-next';
import { FullscreenExit1Icon, Fullscreen2Icon } from 'tdesign-icons-vue-next';
import _props from './props';

export default defineComponent({
  name: 'HDialog',
  props: _props,
  emits: ['update:visible', 'toggleFullscreen'],

  setup(props, { attrs, slots, emit, expose }) {
    const dialogModel = ref(props.mode); // 模态模式或非模态模式
    const visible = ref(props.visible || false); // 对话框可见性
    watch(
      () => props.visible,
      (newVal) => {
        visible.value = newVal;
      },
      { immediate: true }
    );
    // 切换全屏状态
    const toggleFullscreen = () => {
      dialogModel.value = dialogModel.value === 'full-screen' ? props.mode : 'full-screen';
    };
    // 动态对话框属性
    const dialogHeader = computed(() => (
      <div class="fullscreen-dialog-header">
        <div class="fullscreen-dialog-title">{slots.header?.() || props.header}</div>
        <div class="fullscreen-dialog-actions">
          <t-button
            theme="default"
            variant="text"
            shape="square"
            size="small"
            class="fullscreen-toggle"
            onClick={toggleFullscreen}
          >
            {dialogModel.value === 'full-screen' ? <FullscreenExit1Icon /> : <Fullscreen2Icon />}
          </t-button>
          {slots['header-actions']?.()}
        </div>
      </div>
    ));

    const updateVisible = (val: boolean) => {
      props.onBeforeClose?.();
      emit('update:visible', val);

      // 对话框关闭时重置全屏状态
      if (!val && dialogModel.value === 'full-screen') {
        dialogModel.value = props.mode;
      }
    };

    // 暴露方法
    expose({
      toggleFullscreen
    });

    return () => (
      <TDialog
        mode={dialogModel.value}
        v-model:visible={visible.value}
        onBeforeClose={() => updateVisible(false)}
        v-slots={{
          default: slots.default,
          body: slots.body,
          footer: slots.footer,
          header: dialogHeader.value
        }}
      />
    );
  }
});
