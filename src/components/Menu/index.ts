import type { App } from 'vue';
import Menu from './menu';

Menu.install = (app: App) => {
  app.component(Menu.name!, Menu);
};

export default Menu;
