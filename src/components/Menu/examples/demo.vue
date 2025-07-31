<template>
  <h-menu :menuData="menuList">
    <template #logo>
      <img :width="collapsed ? 35 : 136" :src="iconUrl" alt="logo" />
    </template>
  </h-menu>
</template>
<script setup>
// 根据菜单数据生成菜单项
const menuList = [
  {
    value: '1',
    label: '一级菜单',
    icon: 'home',
    type: 'group', // 分组类型
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
</script>
