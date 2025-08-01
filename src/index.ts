// src/index.ts
import type { App } from 'vue';
import Menu from './components/Menu';
// 导入其他组件...

const components = [Menu];

// 全局注册方法
const install = (app: App) => {
  components.forEach((component) => {
    app.component(component.name!, component);
  });
};

// 支持按需导入
export { Menu };

// 默认导出（全局注册）
export default {
  install,
  version: '1.0.0' // 可选：版本号
};
