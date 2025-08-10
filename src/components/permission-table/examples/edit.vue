<template>
  <HPermissionTable> </HPermissionTable>
</template>

<script setup>
import { ref } from 'vue';

const visible = ref(false);
const handleFullscreenChange = (isFullscreen) => {
  console.log('全屏状态:', isFullscreen);
};
const handleClick = () => {
  visible.value = true;
};
</script>
