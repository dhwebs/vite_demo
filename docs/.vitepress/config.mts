import { defineConfig } from 'vitepress';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin';
import { resolve } from 'path';
const alias = {
  '@components': resolve(__dirname, '../../src/components')
};

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'HDesign-vue-next',
  description: '基于 Vue 3 + TDesign-vue-next二次封装的面向后台管理系统的组件库',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '组件', link: '/start' }
    ],

    sidebar: [
      {
        text: '开始',
        items: [
          { text: '快速开始', link: '/start' },
          { text: '更新日志', link: '/api-examples' }
        ]
      },
      {
        text: '组件',
        items: [
          { text: 'Menu 菜单栏组件', link: '/menu' },
          { text: 'Content 容器组件', link: '/content' },
          { text: 'Layout 布局组件', link: '/layout' },
          { text: 'Dialog 对话框组件', link: '/dialog' },
          { text: 'IconSelect 图标选择器组件', link: '/icon-select' },
          { text: 'PermissionTable 权限表格组件', link: '/permission-table' }
        ]
      }
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/dhwebs/vite_demo' }]
  },
  markdown: {
    config(md) {
      md.use(containerPreview, { alias });
      md.use(componentPreview, { alias });
    }
  },
  vite: {
    plugins: [
      vueJsx() // 添加 JSX/TSX 支持
    ],
    resolve: {
      alias
    }
  }
});
