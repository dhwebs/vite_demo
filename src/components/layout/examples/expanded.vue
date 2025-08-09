<script setup lang="ts">
import { ref } from 'vue';
import type { MenuItem } from '../types';

// 嵌套子菜单示例
const nestedMenuData: MenuItem[] = [
  {
    value: 'dashboard',
    content: '仪表盘',
    icon: 'dashboard'
  },
  {
    value: 'resource',
    title: '资源管理',
    icon: 'server',
    children: [
      {
        value: 'list',
        content: '资源列表',
        icon: 'list'
      },
      {
        value: 'add',
        content: '新增资源',
        icon: 'add'
      },
      {
        value: 'edit',
        content: '资源编辑',
        icon: 'edit-1'
      }
    ]
  },
  {
    value: 'monitor',
    title: '监控中心',
    icon: 'precise-monitor',
    children: [
      {
        value: 'control-platform',
        content: '调度平台',
        icon: 'control-platform'
      },
      {
        value: 'data-analysis',
        content: '数据分析',
        icon: 'chart-bar'
      },
      {
        value: 'alerts',
        title: '嵌套菜单',
        icon: 'chart-bar',
        children: [
          {
            value: 'alerts-1',
            icon: 'chart-bar',
            content: '消息1'
          },
          {
            value: 'alerts-2',
            icon: 'chart-bar',
            content: '消息2'
          }
        ]
      }
    ]
  },
  {
    value: 'mail',
    content: '消息区',
    icon: 'mail'
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
  <div class="menu-container">
    <!-- 简单菜单 - 对应图片左侧 -->
    <HMenu
      :collapsed="isCollapsed"
      :menu-data="nestedMenuData"
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
  </div>
</template>

<style scoped>
.menu-container {
  display: flex;
  gap: 40px;
  padding: 20px;
  background: #f5f7fa;
}

.logo {
  padding-right: 10px;
  /* padding: 16px 24px; */
  /* display: flex;
  align-items: center;
  justify-content: center; */
}
</style>
