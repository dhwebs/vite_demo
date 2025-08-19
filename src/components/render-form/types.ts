import type { PropType } from 'vue';

// 定义节点类型
export interface TreeNode {
  elementName: string;
  name: string;
  slots?: string[];
  innerText?: string;
  children?: TreeNode[];
  showComponent?: () => boolean;
  [key: string]: any; // 其他自定义属性
}

// 定义组件 props 类型
export interface RecursiveComponentProps {
  node: TreeNode;
  formData: Record<string, any>;
}
