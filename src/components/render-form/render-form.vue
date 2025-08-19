<template>
  <template v-if="showComponent">
    <slot :name="node.name" v-if="node.elementName === 'slot'"></slot>
    <component
      :is="node.elementName"
      v-model="formData[node.name]"
      v-bind="nodeProps"
      @change="handleChange"
      v-else
    >
      <template v-slot:[slotName] v-for="slotName in node.slots" :key="slotName">
        <slot :name="slotName"></slot>
      </template>
      <template v-if="node.innerText">{{ node.innerText }}</template>
      <!-- 递归处理子节点 -->
      <template v-if="hasChildren">
        <h-render-form
          v-for="(child, index) in node.children"
          :key="index"
          :node="child"
          :form-data="formData"
          @change="$emit('change', $event)"
        >
          <!-- <template v-slot:[slotName]="slotProps" v-for="(slotContent, slotName) in $slots" :key="slotName">
            <slot :name="slotName" v-bind="slotProps"></slot>
          </template> -->
          <template v-slot:[slotName] v-for="slotName in node.slots" :key="slotName">
            <slot :name="slotName"></slot>
          </template>
        </h-render-form>
      </template>
    </component>
  </template>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  node: {
    type: Object,
    required: true
  },
  formData: {
    type: Object,
    default: () => {}
  }
});

const emit = defineEmits(['change']);

// 过滤掉children, showComponent属性
const nodeProps = computed(() => {
  const { children, showComponent, ...rest } = props.node;
  return rest;
});

// 判断是否有子节点
const hasChildren = computed(() => props.node.children && props.node.children.length > 0);

const showComponent = computed(() => {
  return props.node.showComponent ? props.node.showComponent() : true;
});

// 处理变更事件
function handleChange(value) {
  emit('change', {
    value,
    name: props.node.name
  });
}
</script>
<script>
export default {
  name: 'HRenderForm'
};
</script>
