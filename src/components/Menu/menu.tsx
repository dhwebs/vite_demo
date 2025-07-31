import { defineComponent, ref, watch } from 'vue';
import {
  Menu as TMenu,
  MenuGroup as TMenuGroup,
  Submenu as TSubmenu,
  MenuItem as TMenuItem,
  Icon as TIcon,
  Button as TButton
} from 'tdesign-vue-next';
import type { MenuItem } from './types';
import _props from './props';

export default defineComponent({
  name: 'HMenu',

  props: _props,

  emits: ['update:collapsed'],

  setup(props, { slots, emit }) {
    const localCollapsed = ref(props.collapsed);

    watch(
      () => props.collapsed,
      (newVal) => {
        localCollapsed.value = newVal;
      },
      { immediate: true }
    );

    function changeCollapsed() {
      localCollapsed.value = !localCollapsed.value;
      emit('update:collapsed', localCollapsed.value);
    }

    const renderMenu = (items: MenuItem[]) => {
      return items.map((item) => {
        const { children, icon, type, ...restItem } = item;
        if (type === 'group') {
          return <TMenuGroup {...restItem}>{children && renderMenu(children)}</TMenuGroup>;
        }

        if (children) {
          return (
            <TSubmenu
              {...restItem}
              v-slots={{
                icon: icon ? () => <TIcon name={icon} /> : undefined
              }}
            >
              {renderMenu(children)}
            </TSubmenu>
          );
        }

        return (
          <TMenuItem
            {...restItem}
            v-slots={{
              icon: icon ? () => <TIcon name={icon} /> : undefined
            }}
          ></TMenuItem>
        );
      });
    };

    return () => (
      <TMenu
        theme={props.theme}
        collapsed={localCollapsed.value}
        v-slots={{
          logo: slots.logo ? () => slots.logo?.() : undefined,
          operations: () => (
            <TButton
              variant="text"
              shape="square"
              ghost={props.theme === 'dark'}
              class="t-demo-collapse-btn"
              onClick={changeCollapsed}
              v-slots={{ icon: () => <TIcon name="view-list" /> }}
            />
          )
        }}
      >
        {renderMenu(props.menuData)}
      </TMenu>
    );
  }
});
