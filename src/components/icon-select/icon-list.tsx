// FullscreenDialog.tsx
import { defineComponent, ref, watch, computed, onWatcherCleanup } from 'vue';
import { Icon as TIcon } from 'tdesign-vue-next';
import { manifest } from 'tdesign-icons-vue-next';
// import type { DialogProps } from 'tdesign-vue-next';
import _props from './props';

export default defineComponent({
  name: 'h-icon-list',
  props: {
    checked: {
      type: String,
      default: ''
    },
    search: {
      type: String,
      default: ''
    },
    onClick: {
      type: Function,
      default: () => {}
    }
  },
  setup(props) {
    // 获取全部图标的列表
    const options = ref(manifest);
    const checked = ref(props.checked);
    const checkOptions = computed(() => {
      return options.value.filter((item) => {
        return item.stem.includes(props.search) || item.icon.includes(props.search);
      });
    });
    watch(
      () => props.checked,
      (newVal) => {
        checked.value = newVal;
      }
    );
    function handleIconClick(stem: string) {
      checked.value = stem;
      props.onClick?.(stem);
    }
    return () => (
      <div class="h-design-icon-list">
        {checkOptions.value.map(({ stem }) => (
          <div
            class={`h-design-icon-item ${checked.value === stem ? 'checked' : ''}`}
            key={stem}
            title={stem}
            onClick={() => handleIconClick(stem)}
          >
            <TIcon name={stem} size="24" />
            <span>{stem}</span>
          </div>
        ))}
        {checkOptions.value.length === 0 && <div class="empty-state">暂无数据</div>}
      </div>
    );
  }
});
