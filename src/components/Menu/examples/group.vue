<script setup lang="ts">
import { ref } from 'vue';
import type { MenuItem } from '../types';

// 分组菜单示例
const groupedMenuData: MenuItem[] = [
  {
    type: 'group',
    title: '基础功能',
    value: 'base-group',
    children: [
      {
        value: 'dashboard',
        content: '仪表盘',
        icon: 'dashboard'
      },
      {
        value: 'resource',
        content: '资源列表',
        icon: 'server'
      },
      {
        value: 'root',
        content: '根目录',
        icon: 'root-list'
      }
    ]
  },
  {
    type: 'group',
    title: '高级功能',
    value: 'advanced-group',
    children: [
      {
        value: 'control-platform',
        content: '调度平台',
        icon: 'control-platform'
      },
      {
        value: 'precise-monitor',
        content: '精准监控',
        icon: 'precise-monitor'
      },
      {
        value: 'mail',
        content: '消息区',
        icon: 'mail'
      }
    ]
  },
  {
    value: 'user-circle',
    content: '个人中心',
    icon: 'user-circle'
  }
];

const isCollapsed = ref(false);
const activeValue = ref('dashboard');

const handleCollapseToggle = (collapsed: boolean) => {
  console.log('菜单折叠状态:', collapsed);
  isCollapsed.value = collapsed;
};

const handleMenuChange = (value: string) => {
  console.log('选中菜单:', value);
  activeValue.value = value;
};
</script>

<template>
  <HMenu
    theme="light"
    :collapsed="isCollapsed"
    :menu-data="groupedMenuData"
    @update:collapsed="handleCollapseToggle"
    @change="handleMenuChange"
    v-slot:logo
  >
    <div class="logo">
      <img
        height="28"
        :src="
          isCollapsed
            ? 'https://tdesign.gtimg.com/site/logo-only.png'
            : 'https://tdesign.gtimg.com/site/baseLogo-light.png'
        "
        alt="TDesign"
      />
    </div>
  </HMenu>
</template>

<style scoped>
.logo {
  padding-right: 10px;
}
</style>
