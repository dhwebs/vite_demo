<template>
  <h-json-input v-model="jsonString"> </h-json-input>
</template>

<script setup>
import { ref } from 'vue';

const jsonString = ref('');
</script>
