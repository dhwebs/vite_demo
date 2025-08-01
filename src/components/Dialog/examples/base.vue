<template>
  <t-button @click="handleClick">打开对话框</t-button>
  <HDialog
    v-model:visible="visible"
    header="全屏对话框"
    :defaultFullscreen="true"
    @toggleFullscreen="handleFullscreenChange"
  >
    <p>对话框内容...</p>

    <template #footer>
      <t-button @click="visible = false">取消</t-button>
      <t-button theme="primary">确定</t-button>
    </template>
  </HDialog>
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
