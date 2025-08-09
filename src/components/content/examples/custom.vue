<script setup lang="ts">
import { ref } from 'vue';
import type { routeTab } from '../types';

// 分组菜单示例
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
  <HContent theme="light" v-model:tabData="tabData"> </HContent>
</template>

<style scoped>
.logo {
  padding-right: 10px;
}
</style>
