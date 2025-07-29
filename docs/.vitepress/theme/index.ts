// .vitepress/theme/index.ts
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import TDesign from 'tdesign-vue-next';
import 'tdesign-vue-next/es/style/index.css'; // 引入组件库全局样式

export default {
  extends: DefaultTheme, // 继承默认主题
  enhanceApp({ app }) {
    app.use(TDesign); // 注册 TDesign
  }
} satisfies Theme;
