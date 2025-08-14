import { defineComponent, ref, watch, watchEffect } from 'vue';
// import { RouterView, useRoute } from 'vue-router';
import {
  Tabs as TTabs,
  TabPanel as TTabPanel,
  Icon as TIcon,
  Button as TButton,
  Dropdown as TDropdown
} from 'tdesign-vue-next';
import type { ContentRouteTab } from './types';
import type { TdTabsProps, DropdownOption } from 'tdesign-vue-next';
import _props from './props';

export default defineComponent({
  name: 'HContent',

  props: _props,

  emits: ['update:data', 'update:fullscreen'],

  setup(props, { slots, emit }) {
    // const route = useRoute();
    // const cachedRoutes = ref(new Set());

    // 动态管理缓存路由
    // watchEffect(() => {
    //   if (route?.meta?.keepAlive) {
    //     cachedRoutes.value.add(route.name);
    //   }
    // });
    const tabValue = ref('');
    const contentFullscreen = ref(props.fullscreen);
    watch(
      () => props.fullscreen,
      (newVal) => {
        contentFullscreen.value = newVal;
      }
    );
    const options: DropdownOption[] = [
      { value: 'closeOther', content: '关闭其他', prefixIcon: () => <TIcon name="close" /> },
      { value: 'closeAll', content: '关闭全部', prefixIcon: () => <TIcon name="close" /> }
    ];
    function onTabRemove({ value, index }: { value: TdTabsProps['value']; index: number }) {
      if (index < 0) return false;
      const newTabData = props.data.filter((item) => item.value !== value);
      emit('update:data', newTabData);
      if (newTabData.length === 0) return;
      if (tabValue.value === value) {
        tabValue.value = newTabData[Math.max(index - 1, 0)].value;
      }
    }
    function onTabChange(value: TdTabsProps['value']) {
      console.log('onTabChange', value);
      tabValue.value = value as string;
    }
    function dropdownChange(value: DropdownOption) {
      console.log(value);
    }
    return () => (
      <div class={'h-design-content'}>
        <div class={'h-design-content-tabs'}>
          <TTabs
            v-model={tabValue.value}
            theme="card"
            onChange={onTabChange}
            onRemove={onTabRemove}
          >
            {props.data.map((data) => (
              <TTabPanel key={data.value} value={data.value} removable={!data.fixed}>
                {{
                  label: () => (
                    <TDropdown options={options} trigger="context-menu" onClick={dropdownChange}>
                      <div class={'h-design-content-tab-label'}>{data.label}</div>
                    </TDropdown>
                  )
                }}
              </TTabPanel>
            ))}
          </TTabs>
          <div class={'h-design-content-tabs-actions'}>
            <TDropdown options={options} trigger="click" onClick={dropdownChange}>
              <TButton variant="text">
                <TIcon name="chevron-down" size="16" />
              </TButton>
            </TDropdown>
            <TButton
              variant="text"
              onClick={() => {
                contentFullscreen.value = !contentFullscreen.value;
                emit('update:fullscreen', contentFullscreen.value);
              }}
            >
              <TIcon
                name={contentFullscreen.value ? 'fullscreen-exit-1' : 'fullscreen-1'}
                size="16"
              />
            </TButton>
          </div>
        </div>

        <RouterView />
      </div>
    );
  }
});
