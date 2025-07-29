<script setup lang="tsx">
defineOptions({
  name: 'gd-menu'
});
import {
  Menu as TMenu,
  Submenu as TSubmenu,
  MenuItem as TMenuItem,
  Icon as TIcon,
  Button as TButton
} from 'tdesign-vue-next';
import { ref } from 'vue';
import props from './props';
import type { MenuItem } from './types';
defineProps(props);
// 根据菜单数据生成菜单项
const menuList: MenuItem[] = [
  {
    value: '1',
    label: '一级菜单',
    icon: 'home',
    children: [
      {
        value: '1-1',
        label: '二级菜单',
        icon: 'user',
        children: [
          { value: '1-1-1', icon: 'user', label: '三级菜单内容' },
          { value: '1-1-2', icon: 'user', label: '三级菜单内容' },
          { value: '1-1-3', icon: 'user', label: '三级菜单内容' }
        ]
      },
      { value: '1-2', label: '二级菜单', icon: 'user' },
      { value: '1-3', label: '二级菜单', icon: 'user' }
    ]
  },
  {
    value: '2',
    label: '一级菜单2',
    icon: 'user'
  }
];
const expanded = ref(['3-1', '3-5']);
function changeCollapsed() {
  expanded.value = [];
}
const renderMenu = (items: MenuItem[]) => {
  return items.map((item) => {
    if (item.children) {
      return (
        <TSubmenu
          value={item.value}
          title={item.label}
          v-slots={{
            icon: () => <TIcon name={item.icon} />
          }}
        >
          {renderMenu(item.children)}
        </TSubmenu>
      );
    }
    return (
      <TMenuItem
        value={item.value}
        v-slots={{
          icon: () => <TIcon name={item.icon} />
        }}
      >
        {item.label}
      </TMenuItem>
    );
  });
};

// 直接返回 JSX
const render = () => (
  <TMenu
    v-slots={{
      operations: () => (
        <TButton
          variant="text"
          shape="square"
          v-slots={{ icon: () => <TIcon name="view-list" /> }}
        />
      )
    }}
  >
    {renderMenu(menuList)}
  </TMenu>
);
</script>
<template>
  <!-- 在这里使用JSX变量 -->
  <Component :render="render" />
</template>
