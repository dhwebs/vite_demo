<template>
  <HPermissionTable :data="data"> </HPermissionTable>
</template>

<script setup>
import { ref } from 'vue';
const data = [
  {
    name: '页面管理',
    key: 'menu:page',
    type: 'menu',
    icon: 'setting',
    children: [
      {
        name: '页面列表',
        key: 'menu:page:list',
        link: '/list',
        icon: 'list',
        type: 'menu',
        children: [
          {
            name: '查看',
            key: 'menu:page:list:view',
            type: 'button'
          },
          {
            name: '编辑',
            key: 'menu:page:list:edit',
            type: 'button'
          }
        ]
      },
      {
        name: '页面详情',
        key: 'menu:page:detail',
        type: 'menu',
        link: '/detail',
        icon: 'user',
        children: [
          {
            name: '查看',
            key: 'menu:page:detail:view',
            type: 'button'
          }
        ]
      }
    ]
  }
];
const visible = ref(false);
const handleFullscreenChange = (isFullscreen) => {
  console.log('全屏状态:', isFullscreen);
};
const handleClick = () => {
  visible.value = true;
};
</script>
