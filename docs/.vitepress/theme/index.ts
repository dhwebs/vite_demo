// .vitepress/theme/index.ts
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { ElementPlusContainer } from '@vitepress-demo-preview/component';
import '@vitepress-demo-preview/component/dist/style.css';
import TDesign from 'tdesign-vue-next';
import HDesign from '../../../src/index';
import 'tdesign-vue-next/es/style/index.css'; // 引入组件库全局样式
console.log(TDesign, HDesign);
export default {
  extends: DefaultTheme, // 继承默认主题
  enhanceApp({ app }) {
    app.component('demo-preview', ElementPlusContainer);
    app.use(TDesign); // 注册 TDesign
    app.use(HDesign); // 注册 HDesign
  }
} satisfies Theme;
