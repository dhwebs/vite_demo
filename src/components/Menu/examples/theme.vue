<script setup lang="ts">
import { ref } from 'vue';
import type { MenuItem } from '../types';

const data: MenuItem[] = [
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
  },
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
  },
  {
    value: 'user-circle',
    content: '个人中心',
    icon: 'user-circle'
  },
  {
    value: 'play-circle',
    content: '视频区',
    icon: 'play-circle'
  },
  {
    value: 'edit1',
    content: '资源编辑',
    icon: 'edit-1'
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
      theme="light"
      :collapsed="isCollapsed"
      :data="data"
      @update:collapsed="handleCollapseToggle"
      @change="handleMenuChange"
      v-slot:logo
    >
    </HMenu>

    <!-- 深色主题菜单 - 对应图片右侧 -->
    <HMenu
      theme="dark"
      :collapsed="isCollapsed"
      :data="data"
      @update:collapsed="handleCollapseToggle"
      @change="handleMenuChange"
    >
    </HMenu>
    <HMenu
      :collapsed="true"
      :data="data"
      @update:collapsed="handleCollapseToggle"
      @change="handleMenuChange"
    >
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
