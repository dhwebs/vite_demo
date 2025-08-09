<script setup lang="ts">
import { ref } from 'vue';
import content from '../../content/content';

const menuData = [
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
const tabData = ref([
  {
    value: '/base',
    label: '基础功能',
    icon: 'list',
    fixed: true
  },
  {
    value: '/user-circle',
    label: '个人中心',
    icon: 'user-circle'
  }
]);
</script>

<template>
  <HLayout theme="aside-menu" :menuProps="{ menuData }" :contentProps="{ tabData }"> </HLayout>
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
