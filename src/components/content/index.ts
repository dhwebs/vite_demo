import type { App } from 'vue';
import Content from './content';
import './style';
Content.install = (app: App) => {
  app.component(Content.name!, Content);
};

export default Content;
