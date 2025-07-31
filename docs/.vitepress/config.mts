import { defineConfig } from 'vitepress';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin';
import { resolve } from 'path';
const alias = {
  '@components': resolve(__dirname, '../../src/components')
};

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'My Granduation Design',
  description: 'A VitePress Site',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
          { text: 'Menu 菜单栏组件', link: 'menu' }
        ]
      }
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }]
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
