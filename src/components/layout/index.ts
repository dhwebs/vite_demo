import type { App } from 'vue';
import Layout from './layout';
import './style';

Layout.install = (app: App) => {
  app.component(Layout.name!, Layout);
};

export default Layout;
